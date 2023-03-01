const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    displayCategories(data.data.news_category)
    // console.log(data.data.news_category)

}
// load categories in navbar
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    // const sortContainer = document.getElementById('sort-category');

    categories.forEach(category => {
        // console.log(category)
        const { category_id, category_name } = category;
        categoryContainer.innerHTML += `<li class="mr-[30px] font-roboto text-lg font-bold text-categorygray cursor-pointer">
        <a onclick="loadById('${category_id}','${category_name}')">${category_name}</a>
        </li>`

    });

}
let news = [];
// load news detail in categories 
const loadById = (id, category_name) => {
    // console.log(id, category_name)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(response => response.json())
        .then(data => {

            // console.log(data.data)
            news = data.data;
            displayByCategory(data.data, category_name)
        })

}
// load single differant category news in details 
const displayByCategory = (categories, name) => {
    // console.log(categories, name)
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = '';
    const newsCount = document.getElementById('total-result');

    newsCount.innerText = categories.length;
    const category = document.getElementById('category-name')
    category.innerText = name;
    // sort by view
    const sortContainer = document.getElementById('sort-category');

    sortContainer.innerHTML = '';

    categories.forEach(category => {
        console.log(category)
        const { _id, details, thumbnail_url, title, total_view } = category;

        // console.log(total_view)

        const { author, others_info, rating } = category;
        // console.log(title, total_view, thumbnail_url)
        sortContainer.innerHTML += `
        <option class="font-semibold text-sm" value="${total_view}" onClick="loadBySort()">${total_view}</option>
        `

        cardContainer.innerHTML += `
            <div class="flex flex-row gap-10 p-5 bg-white rounded-xl shadow-xl h-[340px] mb-6 my-auto">

                <img class="w-60 h-[300px]" src=${thumbnail_url} alt="">

                <div class="flex flex-col justify-between">
                    <div>
                        <h3 class="font-roboto font-bold text-2xl text-black">${title}</h3>
                        <p class="font-roboto font-normal text-base mt-3">${details.slice(0, 378)}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between mt-4">

                        <div class="flex flex-row items-center gap-3">
                            <img class="w-10 h-10 rounded-full" src=${author.img} alt="">
                            <div class="flex flex-col">
                                <p>${author.name ? author.name : 'Not Available'}</p>
                                <p>${author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-regular fa-eye"></i>
                            ${total_view ? total_view : 'Not Watched'}
                        </div>
                        <div>
                            <i class="fa-regular fa-star"></i>
                        </div>

                        <div>

                        <label for="my-modal-6">
                        <i onClick=singleNews('${_id}') class="fa-solid fa-arrow-right text-blue cursor-pointer"></i>
                        </label>

                        </div>
                    </div>
                </div>
            </div>
        `

    })
}
// load news for modal 
const singleNews = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    const data = await res.json();
    // console.log(data.data)
    singleNewsDetail(data.data)
}
// show news in modal 
const singleNewsDetail = (details) => {
    // console.log(details)
    const modalContainer = document.getElementById('modal-container');
    details.forEach(news => {
        // console.log(news)
        const { _id, details, thumbnail_url, title, total_view } = news;

        const { author, others_info, rating } = news;
        modalContainer.innerHTML = `
        <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="flex flex-col gap-10 p-5 bg-white rounded-xl shadow-xl h-auto mb-6 my-auto">

                <img class="mx-auto w-96" src=${thumbnail_url} alt="">

                <div class="flex flex-col justify-between">
                    <div>
                        <h3 class="font-roboto font-bold text-2xl text-black flex items-center">${title}

                        <span ${others_info.is_trending ? `class="badge badge-md bg-orange-600 border-0"` : `class=""`}>${others_info.is_trending ? 'Trending' : ''}</span>
                        </h3>

                        <p class="font-roboto font-normal text-base mt-3">${details}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between mt-4">

                        <div class="flex flex-row items-center gap-3">
                            <img class="w-10 h-10 rounded-full" src=${author.img} alt="">
                            <div class="flex flex-col">
                                <p>${author.name}</p>
                                <p>${author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-regular fa-eye"></i>
                            ${total_view}
                        </div>
                        <div>
                            <i class="fa-regular fa-star"></i>
                        </div>

                        <div>

                        <label for="my-modal-6">
                        <i class="fa-solid fa-arrow-right"></i>
                        </label>

                        </div>
                    </div>
                </div>
            </div>
        `
    })

}

const loadTrendingNews = () => {

    console.log(news)
    const trendingNews = news.filter(isTrending => isTrending?.others_info?.is_trending === true);

    const categoryName = document.getElementById('category-name').innerText;
    displayByCategory(trendingNews, categoryName)
}

const loadTodaysPick = () => {
    const todaysPick = news.filter(todaysPick => todaysPick?.others_info?.is_todays_pick === true);

    const categoryName = document.getElementById('category-name').innerText;
    displayByCategory(todaysPick, categoryName)

}