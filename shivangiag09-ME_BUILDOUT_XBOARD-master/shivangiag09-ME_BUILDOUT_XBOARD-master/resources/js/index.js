
//Implementation of creating Accordion for each link in magazine
 function createAccordion(idx,title){
    //TODO-create an accordion and use id for number of accordions to be created.
    // title given to each accordion
    // for each magazine link(accordion), call carousel.
      let insideDiv=document.createElement("div")
      insideDiv.innerHTML=`
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="container accordion-item">
          <h2 class="accordion-header" id="flush-heading${idx}">
            <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded="false" aria-controls="collapse${idx}">
            ${title}
            </button>
          </h2>
          <div id="collapse${idx}" class="accordion-collapse collapse ${idx==0?"show":""}" aria-labelledby="heading${idx}">
            <div class="accordion-body" id="accordion-body${idx}">
             
            </div>
          </div>
        </div>
        </div>
    `
    return insideDiv
    
}

// Implementation of adding carousel for each card
function createOuterCarousel(idx){

//TODO- in each card, multiple news are stored, show each card in carousel format
return  `
    <div id="carouselControls${idx}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="carousel-inner${idx}" data-bs-interval="10000"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${idx}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${idx}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`
 return carouselOuterDiv 
}

// function to add carousel item for each of the magazine link
function innerCarousel(idx,innerIdx){
  return `
 <div class="carousel-item" id="carousel-item${idx}${innerIdx}">
 </div>
 `
 return innerDiv
}

//Implementation of adding cards to each API call
 function addCard(item){
 //TODO- create card for each news consisting image and details
   let cardDivInside=document.createElement("div")
   cardDivInside.innerHTML=`
      <div class="card d-block " style="">
      <img class="card-img-top img-fluid h-60" src=${item['enclosure']['link']} alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item['title']}</h5>
        <h6 class="card-subtitle mb-2 text-muted text-secondary">${item['author']}</h6>
        <p class="card-subtitle  text-secondary">${item['pubDate']}</p>
        <p class="card-text">${item['description']}</p>
       <a href="${item['link']}" class="stretched-link" target="_blank"></a>
      </div>
    </div>
    `
   return cardDivInside
}

//setting up the components on UI by calling each function
function getDetails(){
  let idx=0
  magazines.forEach(async (link)=>{
    let res=await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${link}`);
    let data=await res.json();

     let accordionDiv=createAccordion(idx,data['feed']['title'])
    document.getElementById('accordionContainer').append(accordionDiv)
    
    let carouselDiv=createOuterCarousel(idx)
    document.getElementById(`accordion-body${idx}`).innerHTML+=carouselDiv
   
    data['items'].forEach((ele,innerIdx)=>{
     
      let innerCarouselDiv=innerCarousel(idx,innerIdx)
      document.getElementById(`carousel-inner${idx}`).innerHTML+=(innerCarouselDiv)
   
      if(innerIdx==0){
        document.getElementById(`carousel-item${idx}${innerIdx}`).classList.add("active")
      }
      let cardDiv=addCard(ele)
      document.getElementById(`carousel-item${idx}${innerIdx}`).append(cardDiv)
        
    })
    idx++
  })
}
getDetails()

