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
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string("username");
            $table->string("email");
            $table->string("password");
            $table->boolean("contest_admin");
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("ranklist_reference");
            $table->enum('type', ['egyéni', 'páros']);
            $table->timestamps();
        });

        Schema::create('competition', function (Blueprint $table) {
            $table->id();
            $table->string("competition_name");
            $table->string("location");
            $table->dateTime("competition_start");
            $table->dateTime("end_of_pre-registration");
            $table->json("categories");
            $table->json("ratings_and_fees");
            $table->timestamps();
        });

        Schema::create('ranklist', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("points");
            $table->foreignId("categorie")->constrained("categories");
            $table->timestamps();
        });

        Schema::create('registration', function (Blueprint $table) {
            $table->id();
            $table->foreignId("registration_submitter")->constrained("user");
            $table->foreignId("categorie")->constrained("categories");
            $table->foreignId("contestant1")->constrained("ranklist");
            $table->foreignId('contestant2')->nullable()->constrained('ranklist');
            $table->integer("registration_fee");
            $table->foreignId("competition_id")->constrained("competition");
            $table->timestamps();
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string("imagepath", length: 255);
            $table->string("title");
            $table->string("content");
        });

        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
