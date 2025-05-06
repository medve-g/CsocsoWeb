

export default function CreateContest() {
    return (
        <div>
            <form action="" method="" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-green-600">

                <label for="competition_name" class="block font-medium mb-1 ">Verseny neve:</label>
                <input type="text" id="competition_name" name="competition_name" required class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700" /><br />

                <label for="location" class="block font-medium mb-1">Helyszín:</label>
                <input type="text" id="location" name="loccation" required class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700" /><br/>

                <label for="competition_start" class="block font-medium mb-1">Verseny kezdete:</label>
                <input type="datetime-local" id="competition_start" name="competition_start" required class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700" /><br/>

                <label for="end_of_pre-registration" class="block font-medium mb-1">Előregisztráció vége:</label>
                <input type="datetime-local" id="end_of_pre-registration" name="end_of_pre-registration" required class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700" /><br/>

                <label for="categories_and_fees" class="block font-medium mb-1">Kategóriák és díjak</label>
                <input type=""></input>

                <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Beküldés</button>
            </form>
        </div>
    )
}




