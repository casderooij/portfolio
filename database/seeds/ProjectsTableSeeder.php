<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $start = Carbon::createFromDate(2014, 11, 15);
        $end = Carbon::createFromDate(2015, 2, 2);

        DB::table('projects')->insert([
            'title' => 'Project 1',
            'description' => '["Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.","Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.","Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus."]',
            'meta' => '{"collaboration":["Piet","Sara"],"location":"Rotterdam"}',
            'images' => '[{"image_file":"image1.png","image_description":"This is the first image"},{"image_file":"image2.jpeg","image_description":""},{"image_file":"image3.png","image_description":"This is the third image"}]',
            'video_url' => '',
            'startdate' => $start,
            'enddate' => $end,
            'year' => '[2014, 2015]',
            'days' => $start->diffInDays($end),
            'block_position' => '{"block_col":1,"block_z_index":1,"block_left":0,"bg_color":[214,151,151]}',
        ]);
    }
}
