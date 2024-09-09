<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMapping;

class TimeTableImport implements ToCollection,WithHeadingRow,WithMapping
{
    /**
    * @param Collection $rows
    */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row)
        {
            logger()->info('fff',$row->toArray());
        }
    }

    public function map($row): array
    {
        return [
            'date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['date'])->format('Y-m-d'), // Convert date
            'shamsi' => $row['shamsi'],
            'day' => $row['day'],
            'shift' => $this->convertTime($row['shift']),
            'shrh_taatyly' => $row['shrh_taatyly'],
            'time' =>$row['time']? $this->convertTime($row['time']):0,
            'off' => $row['off']?$this->convertTime($row['off']):0
        ];
    }
    /**
     * Convert Excel's serial time into a readable format.
     *
     * @param mixed $value
     * @return string
     */
    private function convertTime($value): string
    {
        if (is_numeric($value)) {
            return gmdate('H:i:s', $value * 86400);
        }
        return $value;
    }
}
