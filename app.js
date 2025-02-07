const searchInputElement = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-Btn")
const clearBtn = document.querySelector(".clearBtn")
const search_resultsDiv = document.querySelector(".search_results")

const countrySearch = []

//Fetch Data
const searchData = () => {
    countrySearch.length = 0
    const searchInput = searchInputElement.value.toLowerCase();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (data[searchInput]) {
                countrySearch.push(data[searchInput])
                //console.log(typeof data[searchInput])
            }
        }).catch(error => {
            console.log("Error:", error)
        })
}

const updateHTML = () => {
    searchData()

    setTimeout(() => {
        let htmlContent = "";
        countrySearch.forEach((item) => {
            item.forEach((obj) => {
                htmlContent += `
                        <div class="search_card">
                            <img src="images/${obj.imageUrl}" alt="${obj.name}" />
                            <div>
                                <h6>${obj.name}</h6>
                                <p>${obj.description}</p>
                                <button class="visit">Visit</button>
                            </div>
                        </div>
                    `;
            });
        });
        search_resultsDiv.innerHTML = htmlContent;
    }, 1000)


    searchInputElement.value = ""
}

searchBtn.addEventListener("click", updateHTML)
clearBtn.addEventListener("click", () => {
    search_resultsDiv.innerHTML = ""
    countrySearch.length = 0
    updateHTML()
})