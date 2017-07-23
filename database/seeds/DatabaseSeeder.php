<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

            Eloquent::unguard();

            $this->call('AboutTableSeeder');
    }

}

class AboutTableSeeder extends Seeder{

    public function run(){

        DB::table('tipos')->insert(array(
            'name' => 'Interaction Design',
            'photo' => 'profiel.jpg',
            'text' => '["Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.","Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.","Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus."]',
            'social' => '[{"socialmedia":"twitter","url":"twitter.com"},{"socialmedia":"facebook","url":"facebook.com"}]',
            'email' => 'casdrooij@gmail.com'
        ));
    }
}
