export default function CreateContest() {
    const handleButtonClick = (event) => {
        event.preventDefault();
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
        const selectedCategories = {};

        checkedRadios.forEach((radio) => {
            const category = radio.className.split(' ')[0];
            selectedCategories[category] = parseInt(radio.id);
        });

        console.log(selectedCategories);
    };
    return (
        <div className="my-24">
            <form
                action=""
                method=""
                class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-green-600"
            >
                <label for="competition_name" class="block font-medium mb-1 ">
                    Verseny neve:
                </label>
                <div>
                    <input
                        type="text"
                        id="competition_name"
                        name="competition_name"
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                    />
                </div>

                <label for="location" class="block font-medium mb-1">
                    Helyszín:
                </label>
                <div>
                    <input
                        type="text"
                        id="location"
                        name="loccation"
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                    />
                </div>

                <label for="competition_start" class="block font-medium mb-1">
                    Verseny kezdete:
                </label>
                <div>
                    <input
                        type="datetime-local"
                        id="competition_start"
                        name="competition_start"
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                    />
                </div>

                <label for="end_of_pre-registration" class="block font-medium mb-1">
                    Előregisztráció vége:
                </label>
                <div>
                    <input
                        type="datetime-local"
                        id="end_of_pre-registration"
                        name="end_of_pre-registration"
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                    />
                </div>

                <label for="ratings_and_fees" class="block font-medium mb-1">
                    Besorolás és díjak
                </label>
                <div class="space-y-4" id="ratings_and_fees">
                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Rookie (junior)</p>
                        <input
                            type="text"
                            name="rookie-junior"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Rookie</p>
                        <input
                            type="text"
                            name="rookie"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Semi-pro (junior)</p>
                        <input
                            type="text"
                            name="semi-pro-junior"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Semi-pro</p>
                        <input
                            type="text"
                            name="semi-pro"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Pro</p>
                        <input
                            type="text"
                            name="pro"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="w-40 text-sm text-green-700 m-0">Master</p>
                        <input
                            type="text"
                            name="master"
                            required
                            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500 text-green-700"
                        />Ft
                    </div>
                </div>


                <label for="categories" class="block font-medium mb-1 text-center">
                    Kategóriák
                </label>
                <div class="flex justify-center gap-16">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-2">
                            <input type="radio" id="1" class="Nyílt-Páros" />
                            <label for="1">Nyílt Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="2" class="Nyílt-Egyéni" />
                            <label for="2">Nyílt Egyéni</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="3" class="Semi-pro-Páros" />
                            <label for="3">Semi-pro Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="4" class="Rookie-Páros" />
                            <label for="4">Rookie Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="5" class="Vegyes-Páros" />
                            <label for="5">Vegyes Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="6" class="Rookie-Egyéni" />
                            <label for="6">Rookie Egyéni</label>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-2">
                            <input type="radio" id="7" class="Amatőr-Páros" />
                            <label for="7">Amatőr Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="8" class="Női-Páros" />
                            <label for="8">Női Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="9" class="Női-Egyéni" />
                            <label for="9">Női Egyéni</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="10" class="Junior-Páros" />
                            <label for="10">Junior Páros</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="11" class="Junior-Egyéni" />
                            <label for="11">Junior Egyéni</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" id="12" class="Sorsolásos-Páros" />
                            <label for="12">Sorsolásos Páros</label>
                        </div>
                    </div>
                </div>


                <button
                    type="submit"
                    class="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition block mx-auto"
                    onClick={handleButtonClick}
                >
                    Beküldés
                </button>
            </form>
        </div>
    );
}

