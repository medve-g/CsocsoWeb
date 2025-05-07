import { useState } from "react";

export function AddNews() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [imageURL, setImageURL] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFileName(selectedFile.name);
            setImageURL(URL.createObjectURL(selectedFile));
        }
    };


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", document.querySelector('input[type="file"]').files[0]);
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/newsApi", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log("Success:", result);
            alert("Hír sikeresen feltöltve!");
        } catch (error) {
            console.error("Error uploading news:", error);
            alert("Hiba történt a feltöltés során!");
        }
    };

    return (
        <div className="w-full flex justify-center items-center my-20">
            <div className="bg-white w-[1000px] px-10 py-20 rounded-xl drop-shadow-lg">
                <h1 className="mb-10 text-[45px] text-center font-semibold">Új Hír felvétele</h1>

                <div className="flex flex-col">
                    <label className="font-medium text-lg">A hír címe:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-1 mb-3"
                        placeholder="Ez a cím fog megjelenni a kezdőlapon"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-lg">A hír tartalma:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-1 mb-3 h-40"
                        placeholder="Ez a hír leírása és tartalma"
                    />
                </div>

                <div>
                    <label className="font-medium text-lg">Válassz ki egy képet a hírhez:</label>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                        className="w-full border rounded-xl p-3 mt-1 mb-3"
                    />
                    {imageURL && (
                        <div className="mt-4">
                            <img src={imageURL} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 rounded-md font-bold text-white text-xl px-6 py-3 mt-6 hover:bg-green-600 transition"
                >
                    Küldés
                </button>
            </div>
        </div>
    );
}
