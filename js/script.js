'use strict';

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


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);
  console.log(optArticleSelector + customSelector);

  let html = '';
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element & get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
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
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */
}
generateTags();


function tagClickHandler(event){
  console.log('Tag was clicked!');
  console.log(event);
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  
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
  console.log(tagLinks);

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


function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // console.log(authorWrapper);
      
    /* get tags from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    // console.log(authorTags);
   
    /* generate HTML of the link */
    const authorTag = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';
    // console.log(authorTag);
    
    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = authorTag;
  }
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