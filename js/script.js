'use strict';

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list',
  tagsListSelector: '.tags.list'
};

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);

  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this;
  // console.log('clickedElement:', clickedElement);
  
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

  

function generateTitleLinks(customSelector = ''){
  
  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';
  
  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  // console.log(articles);
  // console.log(customSelector);
  // console.log(optArticleSelector + customSelector);
  
  let html = '';
  for(let article of articles){
  
    /* get the article id */
    const articleId = article.getAttribute('id');
  
    /* find the title element & get the title from the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
  
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  
    /* insert link into titleList */
    html = html + linkHTML;
    // console.log(html);
  }
  
  titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
// console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


function calculateTagsParams(tags) {

  const params = { max: 0, min: 999999 };

  for(let tag in tags){
    
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    else if(tags[tag] < params.min){
      params.min = tags[tag];
    }

    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}
calculateTagsParams();

/* classNumber = Math.floor( 0.5 * 5 + 1 );
classNumber = Math.floor( 0.5 * optCloudClassCount + 1 );
classNumber = Math.floor( ( 4 / 8 ) * optCloudClassCount + 1 );
classNumber = Math.floor( ( (6 - 2) / (10 - 2) ) * optCloudClassCount + 1 );
classNumber = Math.floor( ( (count - 2) / (10 - 2) ) * optCloudClassCount + 1 );
classNumber = Math.floor( ( (count - 2) / (params.max - 2) ) * optCloudClassCount + 1 );
classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * optCloudClassCount + 1 );
classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 ); */

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
  
  return opt.cloudClassPrefix + classNumber;
}


function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  // console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagsSelector);
    // console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      // console.log(tag);
      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      // console.log(linkTag);
      /* add generated code to html variable */
      html = html + linkTag + ' ';
      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags objects */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [new] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [new] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>' + ' ';
    console.log('tagLinkHTML:', tagLinkHTML);

    /* [new] generate code of a link and add it to allTags HTML */
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    allTagsHTML += tagLinkHTML;

    /* [new] END LOOP: for each tag in allTags */
  }
    
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  // tagList.innerHTML = allTags.join(' ');
  // console.log(allTagsHTML);
}
generateTags();


function tagClickHandler(event){
  console.log('Tag was clicked!');
  console.log(event);
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log(clickedElement);
  
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log(tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log(activeTagLinks);

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    // console.log(tagLink);
    /* [DONE] add class active */
    tagLink.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  // console.log(tagLinks);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
    // console.log(tagLink);
  }
}
addClickListenersToTags();




function calculateAuthorsParams(authors) {

  const params = { max: 0, min: 999999 };

  for(let author in authors){
    
    if(authors[author] > params.max){
      params.max = authors[author];
    }
    else if(authors[author] < params.min){
      params.min = authors[author];
    }

    console.log(author + ' is used ' + authors[author] + ' times');
  }

  return params;
}
calculateAuthorsParams();



function calculateAuthorClass(count, params) {
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opt.cloudClassCount + 1 );
  return opt.cloudClassPrefix + classNumber;
}


function generateAuthors(){
  // create a new variable allAuthors with an empty object
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  // console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(opt.articleAuthorSelector);
    // console.log(authorWrapper);
      
    /* get tags from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    // console.log(authorTags);

    /* generate HTML of the link */
    const authorTag = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';
    // console.log(authorTag);


    /* check if this link is NOT already in allAuthors */
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(authorTags)){
      /* add author to allAuthors objects */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = authorTag;
  }
  /* find list of authors in right column */
  const authorList = document.querySelector(opt.authorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

  /* create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* START LOOP: for each author in allAuthors */
  for (let author in allAuthors) {

    const authorLinkHTML = '<li><a href="#author-' + author + '" class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
    console.log('authorLinkHTML:', authorLinkHTML);

    /* generate code of a link and add it to allAuthors HTML */
    allAuthorsHTML += authorLinkHTML;

    /* END LOOP: for each author in allAuthors */
  }

  /* add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();


function authorClickHandler(event){
  console.log('Author was clicked!');
  console.log(event);
  /* prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log(clickedElement);
  
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  // console.log(author);

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  // console.log(activeAuthorLinks);

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks){
    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');
    /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(authorLinks);

  /* [DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks){
    // console.log(authorLink);
    /* [DONE] add class active */
    authorLink.classList.add('active');
  /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  // console.log(authorLinks);
  /* START LOOP: for each link */
  for (let authorLink of authorLinks){
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
    // console.log(authorLink);
  }
}
addClickListenersToAuthors();