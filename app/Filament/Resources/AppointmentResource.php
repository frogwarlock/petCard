<?php

namespace App\Filament\Resources;

use App\Enums\VaccineName;
use App\Filament\Resources\AppointmentResource\Pages;
use App\Filament\Resources\AppointmentResource\RelationManagers;
use App\Models\Appointment;
use Filament\Forms;
use Filament\Forms\Components\Wizard;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AppointmentResource extends Resource
{
    protected static ?string $model = Appointment::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Wizard::make([
                Step::make('Clinic & Doctor')
                    ->schema([
                        Forms\Components\Select::make('clinic_id')
                            ->label('Clinic')
                            ->relationship('clinic', 'name')
                            ->reactive()
                            ->required(),

                        Forms\Components\Select::make('employee_id')
                            ->label('Doctor')
                            ->options(function (Forms\Get $get) {
                                $clinicId = $get('clinic_id');
                                if (!$clinicId) return [];

                                return \App\Models\Employee::where('clinic_id', $clinicId)
                                    ->pluck('name', 'id')
                                    ->toArray();
                            })
                            ->required(),
                    ]),

                Step::make('Pet & Vaccine')
                    ->schema([
                        Forms\Components\Select::make('pet_id')
                            ->relationship('pet', 'name')
                            ->required(),

                        Forms\Components\Toggle::make('has_vaccine')
                            ->label('Was vaccinated?')
                            ->reactive(),

                        Forms\Components\Select::make('vaccine_name')
                            ->label('Vaccine')
                            ->options(
                                collect(VaccineName::cases())
                                    ->mapWithKeys(fn ($case) => [$case->value => $case->label()])
                            )
                            ->visible(fn (Forms\Get $get) => $get('has_vaccine') === true)
                            ->required(fn (Forms\Get $get) => $get('has_vaccine') === true),

                        Forms\Components\DatePicker::make('vaccine_date')
                            ->visible(fn (Forms\Get $get) => $get('has_vaccine') === true)
                            ->required(fn (Forms\Get $get) => $get('has_vaccine') === true),

                        Forms\Components\DatePicker::make('next_dose_date')
                            ->label('Next Dose')
                            ->visible(fn (Forms\Get $get) => $get('has_vaccine') === true),
                    ]),

                Step::make('Notes')
                    ->schema([
                        Forms\Components\Textarea::make('observation')
                            ->maxLength(255),
                    ]),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table // table é responsável por renderizar a tabela de listagem
            ->columns([
                Tables\Columns\TextColumn::make('clinic.name')
                    ->sortable()
                    ->searchable()
                    ,
                Tables\Columns\TextColumn::make('employee.name')
                    ->label('Doctor')
                    ->numeric()
                    ->sortable()
                    ->searchable()
                    ,
                Tables\Columns\TextColumn::make('pet.name')
                    ->numeric()
                    ->searchable()
//                  ->sortable()
                    ,
                Tables\Columns\IconColumn::make('has_vaccine')
                    ->label('Vaccinated?')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->alignCenter(),



        Tables\Columns\TextColumn::make('observation')



            ])
            ->filters([
                //
            ])
            ->actions([
            ])
            ->bulkActions([
//                Tables\Actions\BulkActionGroup::make([
//                    Tables\Actions\DeleteBulkAction::make(),
//                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Care';
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAppointments::route('/'),
            'create' => Pages\CreateAppointment::route('/create'),
            'edit' => Pages\EditAppointment::route('/{record}/edit'),
        ];
    }
}
