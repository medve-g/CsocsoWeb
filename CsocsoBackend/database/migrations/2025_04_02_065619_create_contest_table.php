<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contest', function (Blueprint $table) {
            $table->id();
            $table->string("contest_name");
            $table->date("contest_date");
            $table->string("location");
            $table->datetime("preregistration_closing");
            $table->json("entry_fee")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contest');
    }
};
