const header = document.querySelector('.header')
const mainHeader = document.querySelector('.main-header')
const iconMenu = document.querySelector('.icon-menu')
const fixedBlocks = document.querySelectorAll(".fixed-block")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector("#success-modal")
const errorModal = document.querySelector("#error-modal")
const overlay = document.querySelector(".overlay")
const customSelect = document.querySelectorAll(".select-custom")
const filter = document.querySelector(".filter-cat__form")
const priceFilter = document.querySelector(".price-filter")
let animSpd = 500
//enable scroll
function enableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//swhitch tab
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      let href = item.getAttribute("data-nav")
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
//smoothdrop
function smoothDrop(header, body) {
  if (!header.classList.contains("active")) {
    body.style.height = 'auto';
    let height = body.clientHeight + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
    }, 0);
  } else {
    body.style.height = '0px';
  }
  header.classList.toggle("active")
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__option input").forEach(item => {
    item.addEventListener("change", (e) => {
      setActiveOption(select)
      closeSelectCustom(select);
    });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
// set active select option
function setActiveOption(select) {
  let activeInpTxt = select.querySelector("input:checked").nextElementSibling.innerHTML
  select.querySelector(".select-custom__selected span").innerHTML = activeInpTxt
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
// show reset button
function resetBtnVisible(form) {
  form.querySelector(".icon-close").style.opacity = '1'
  form.querySelector(".icon-close").style.visibility = 'visible'
}
// unshow reset button
function resetBtnHidden(form) {
  form.querySelector(".icon-close").style.opacity = '0'
  form.querySelector(".icon-close").style.visibility = 'hidden'
}
// search form onreset
function searchReset(form) {
  form.querySelectorAll("input").forEach(inp => {
    if (inp.type != "hidden") {
      inp.value = ""
    }  
  });
  resetBtnHidden(form)
}
// unshow preloader
window.addEventListener("load", () => {
  document.body.classList.remove("no-scroll")
  disableScroll()
  let i = 0
  let interval = setInterval(() => {
    document.querySelector(".preloader__percent").textContent = i
    i++
    if (i === 101) {
      clearInterval(interval)
      setTimeout(() => {
        enableScroll()
      }, 1600);
    }
  }, 1);
})
//fixed header
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  if (windowTop > 1) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})
// js-anchor
document.querySelectorAll(".js-anchor").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault()
    let href = item.getAttribute("href")
    let windowTop = window.pageYOffset || document.documentElement.scrollTop
    if (document.querySelector(href)) {
      let dest = windowTop + document.querySelector(href).getBoundingClientRect().top
      window.scrollTo({top: dest - 60, behaviour: "smooth"})
    }
  })
})
//drop menu
iconMenu.addEventListener("click", () => {
  if (header.classList.contains("active")) {
    header.classList.remove("active")
    iconMenu.setAttribute('aria-label', 'Открыть меню');
    enableScroll()
  } else {
    header.classList.add("active")
    iconMenu.setAttribute('aria-label', 'Закрыть меню');
    disableScroll()
  }
})
document.querySelectorAll(".menu li").forEach(el => {
  el.addEventListener("click" , () => {
    if (header.classList.contains("active")) {
      header.classList.remove("active")
      iconMenu.setAttribute('aria-label', 'Открыть меню');
      enableScroll()
    } 
  })
})
// search-form reset btn show/unshow
const search= document.querySelectorAll(".search")
search.forEach(form => {
  form.querySelector('input').addEventListener("input", () => {
    if (form.querySelector('input').value.length > 0) {
      resetBtnVisible(form)
    } else {
      resetBtnHidden(form)
    }
  })
})
// custom select open/close
if (customSelect) { 
  customSelect.forEach(select => {
    setActiveOption(select)
    select.querySelector(".select-custom__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
  
}
//  video-review swiper
if (document.querySelector(".rec-catalog")) {
  const vidRewSwiper = new Swiper(".rec-catalog .swiper", {
    slidesPerView: 1,
    spaceBetween: 18,
    observer: true,
    observeParents: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false	
    },
    navigation: {
      prevEl: ".rec-catalog .swiper-btn--prev",
      nextEl: ".rec-catalog .swiper-btn--next"
    },
    breakpoints: {
      991.98: {
        slidesPerView: 4,
        spaceBetween: 18,
      },
      767.98: {
        slidesPerView: 3,
        spaceBetween: 18,
      }, 
      520.98: {
        slidesPerView: 2,
        spaceBetween: 18,
      }, 
    },
  })
}
//product info nav tabswitch
const productNavs = document.querySelectorAll(".info-product [data-nav]")
const productBlocks = document.querySelectorAll(".info-product [data-block]")
if (document.querySelector(".info-product")) {
  tabSwitch(productNavs,productBlocks)
}
//product swiper
if (document.querySelector(".product__swipers")) {
  const productThumbs = new Swiper(".product__thumbswiper", {
    slidesPerView: 4,
    spaceBetween: 8,
    direction: "horizontal",
    observer: true,
    observeParents: true,
    speed: 800,
    breakpoints: {
      600.98: {
        direction: "vertical"
      } 
    }
  })
  const productMain = new Swiper(".product__mainswiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: "fade",
    thumbs: {
      swiper: productThumbs
    }
  })
}
// filter drop
const secFilterHeader = document.querySelectorAll(".sec-filter__header")
const secFilterBody = document.querySelectorAll(".sec-filter__body")
if (secFilterHeader) {
  secFilterHeader.forEach((item,idx) => {
    item.addEventListener("click", () => smoothDrop(secFilterHeader[idx], secFilterBody[idx]))
  })
}
// mobile filter
if (document.querySelector(".catalog__filter--mobile")) {
  document.querySelector(".catalog__filter--mobile").addEventListener("click", () => {
    const filterCat = document.querySelector(".filter-cat") 
    const filterCatIcon = document.querySelector(".filter-cat__icon")
    disableScroll()
    filterCat.classList.add("active");
    filterCat.addEventListener("click", e => {
      if (!document.querySelector(".filter-cat__inner").contains(e.target)) {
        filterCat.classList.remove("active");
        enableScroll()
      }
    })
    filterCatIcon.addEventListener("click", () => {
      filterCat.classList.remove("active");
      enableScroll()
    })
  })
}
//init price slider
function initSliders() {
  let priceStart = priceFilter.querySelector(".price-start")
  let priceEnd = priceFilter.querySelector(".price-end")
  let priceSlider = priceFilter.querySelector(".price-filter__slider")
  let start = +priceFilter.getAttribute("data-start")
  let end = +priceFilter.getAttribute("data-end")
  let min = +priceFilter.getAttribute("data-min")
  let max = +priceFilter.getAttribute("data-max")
  noUiSlider.create(priceSlider, {
    start: [start, end],
    connect: true,
    range: {
      'min': min,
      'max': max
    }
  });

  priceStart.addEventListener("focus", () => {
    priceStart.value = priceStart.value.replaceAll(' ', '')
  });
  priceEnd.addEventListener("focus", () => {
    priceEnd.value = priceEnd.value.replaceAll(' ', '')
  });
  priceStart.addEventListener("change", () => {
    priceSlider.noUiSlider.set([priceStart.value, null])
  });
  priceEnd.addEventListener("change", () => {
    priceSlider.noUiSlider.set([null,priceEnd.value])
  });
  let priceValues = [priceStart, priceEnd];
  priceSlider.noUiSlider.on('update', function (values, handle) {
    priceValues[handle].value = String(parseInt(values[handle])).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim();  
  });
}
//filter-form
if (priceFilter) {
  initSliders()
  filter.addEventListener("reset", e => {
    e.preventDefault()
    filter.querySelectorAll("input").forEach(inp => {
      inp.removeAttribute("checked")
    })
   filter.querySelector(".price-filter__slider").noUiSlider.set([+priceFilter.getAttribute("data-start"),+priceFilter.getAttribute("data-end")])
  })
}
