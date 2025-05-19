<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AppointmentResource\Pages;
use App\Filament\Resources\AppointmentResource\RelationManagers;
use App\Models\Appointment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AppointmentResource extends Resource
{
    protected static ?string $model = Appointment::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    public static function form(Form $form): Form
    {
        return $form // form é responsável por renderizar o formulário de criação e edição
            ->schema([
                Forms\Components\TextInput::make('clinic_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('employee_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('pet_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('observation')
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table // table é responsável por renderizar a tabela de listagem
            ->columns([
                Tables\Columns\TextColumn::make('clinic.name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('employee.name')
                    ->label('Doctor')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('pet.name')

                    ->numeric()
//                  ->sortable()
            ,
                Tables\Columns\TextColumn::make('observation')
                    ->searchable(),
//                Tables\Columns\TextColumn::make('created_at')
//                    ->dateTime()
//                    ->sortable()
//                    ->toggleable(isToggledHiddenByDefault: true),
//                Tables\Columns\TextColumn::make('updated_at')
//                    ->dateTime()
//                    ->sortable()
//                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
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
