<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConstantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('constants')->truncate();
        $data = [
            [
                'title'=>'دستمزد روزانه',
                'value'=>2388728,
                'type'=>'positive'
            ],[
                'title'=>'بن کارگری',
                'value'=>140000,
                'type'=>'positive'
            ],[
                'title'=>'حق مسکن',
                'value'=>9000000,
                'type'=>'positive'
            ],[
                'title'=>'حق اولاد (برای هر فرزند)',
                'value'=>7166184,
                'type'=>'positive'
            ],[
                'title'=>'حق تاهل',
                'value'=>5000000,
                'type'=>'positive'
            ],[
                'title'=>'حق بیمه',
                'value'=>5239659,
                'type'=>'negative'
            ],[
                'title'=>'مالیات',
                'value'=>0,
                'type'=>'negative'
            ],[
                'title'=>'پایه سنوات',
                'value'=>0,
                'type'=>'positive'
            ],[
                'title'=>'سایر کسورات',
                'value'=>0,
                'type'=>'negative'
            ],[
                'title'=>'سایر اضافات',
                'value'=>0,
                'type'=>'positive'
            ],
        ];
        DB::table('constants')->insert($data);
    }
}
