<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\NewsModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\Test;

class NewsControllerTest extends TestCase
{
    use DatabaseTransactions;

    #[Test]
    public function it_fetches_all_news_successfully()
    {

        NewsModel::factory()->create(['title' => 'News 1', 'content' => 'Content 1']);
        NewsModel::factory()->create(['title' => 'News 2', 'content' => 'Content 2']);


        $response = $this->getJson('/api/newsApi');


        $response->assertStatus(200)
                 ->assertJsonCount(NewsModel::count());
    }

    #[Test]
    public function it_creates_news_successfully()
    {
        Storage::fake('public'); 

        $data = [
            'title' => 'New News',
            'content' => 'This is a test news content',
            'image' => UploadedFile::fake()->create('news.jpg', 1024, 'image/jpeg')
        ];

        $response = $this->postJson('/api/newsApi', $data);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'data' => ['title', 'content', 'imagepath']
                 ]);

        Storage::disk('public')->put('news.jpg', 'fake image content');

        Storage::disk('public')->assertExists('news.jpg');

        $this->assertDatabaseHas('news', ['title' => 'New News']);
    }

    #[Test]
    public function it_validates_required_fields_when_creating_news()
    {
        $data = [];

        $response = $this->postJson('/api/newsApi', $data);

        $response->assertStatus(422)
                 ->assertJsonStructure(["errors"]);
    }

    #[Test]
    public function it_deletes_news_successfully()
    {
        $news = NewsModel::factory()->create();

        $response = $this->deleteJson('/api/newsApi/' . $news->id);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Hír sikeresen törölve!']);

        $this->assertDatabaseMissing('news', ['id' => $news->id]);
    }
}

