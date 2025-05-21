<?php

namespace App\Enums;

enum VaccineName :string
{
    case RABIES = 'Rabies';
    case V10 = 'V10';
    case V8 = 'V8';
    case ANTIFLEA = 'anti-flea';
    case DEWORMING = 'Deworming';

    public function label(): string
    {
        return match ($this){
            self::RABIES => 'Raiva',
            self::V10 => 'V10',
            self::V8 => 'V8',
            self::ANTIFLEA => 'Antipulgas',
            self::DEWORMING => 'Vermífugo'
        };
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }
}
