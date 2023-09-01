 const accessKey = "UXuI1jRGQHeX31ziVVdnkytxRfekTWNP94-UTSA5S9Y";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("serchInput");
const SearchResults = document.querySelector(".searchResults");
const showMore = document.getElementById("showMoreButton");

let inputData = "";

let page = 1; // default page no (if user clicks on the show more button , we will redirect to the next page , so the first page is default one)

// now the Main part ...................................................

async function searchImages(){
    inputData = inputElement.value;
    // whenever user types an keyword we will get the images from the unsplash.com .. so we need to create the dynamic url 

    if(page === 1){
        SearchResults.innerHTML="";
       }    

    // creating the dynamic url 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
   // depending upon this url our page , our input data and aur access key (our this url will fetch all the images from the unsplash.com api and show those images insde our webpage )
   // for doing that we need to use fetch and response method , 

   const response = await fetch(url);
   const data = await response.json() ;// now this data variable holds the all the json data from the fetched api
   // now we need to convert those  json data into images and text , so for that 

   const results = data.results ;// in this results variable lots of images and lots of data is present 
   
   // we need to show images , text so one by one so , thats why we need to map these results variable
  
   results.map((result)=>{
    // creating a duplicate container to display the images and some values like in the html folder
        const imageContainer = document.createElement("div");
         imageContainer.classList.add("search-Result");

         const image = document.createElement("img");
         image.src= result.urls.small ;
         image.alt= result.alt_description ;

         const imageLink = document.createElement("a");
         imageLink.href = result.links.html;
         imageLink.target = "_blank";
         imageLink.textContent = result.alt_description;

         // now we append these things inside our webpage

           // inside our search result we append our div and insede our div , we are going to append image and image link 
         imageContainer.appendChild(image);
         imageContainer.appendChild(imageLink);
         SearchResults.appendChild(imageContainer);
 
         // increasing the page no 
         page++;

         // if the image query has  the page no more than one then we need to show  the showMore  button so the use can go to the next 2nd page ,
         if(page > 1)
        {
            showMoreButton.style.display = "block" ;
        }
    })
}

// ...................................................................................................


formElement.addEventListener("submit",(event)=>{
    // Preventing the default event 
    event.preventDefault();
    page = 1;
    searchImages();
})


// now if any one click on the show more button i want to show more image so that , we need to call the  searchImages(); again 

showMoreButton.addEventListener("click",()=>{
    searchImages();
})