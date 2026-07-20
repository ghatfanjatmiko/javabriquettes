/* Java Briquettes Co. — main.js */
(function(){
  "use strict";

  /* ---------- Page loader ---------- */
  window.addEventListener("load", function(){
    var loader = document.querySelector(".page-loader");
    if(loader){
      setTimeout(function(){ loader.classList.add("is-hidden"); }, 250);
    }
  });

  /* ---------- Sticky nav ---------- */
  var nav = document.querySelector(".nav");
  function onScrollNav(){
    if(!nav) return;
    if(window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScrollNav, {passive:true});
  onScrollNav();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav__toggle");
  if(toggle && nav){
    toggle.addEventListener("click", function(){
      nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });
    nav.querySelectorAll(".nav__links a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("is-open"); });
    });
  }

  /* ---------- Active nav link ---------- */
  (function(){
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__links a").forEach(function(a){
      var href = a.getAttribute("href");
      if(href === path || (path === "" && href === "index.html")){
        a.classList.add("is-active");
      }
    });
  })();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if("IntersectionObserver" in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:"0px 0px -60px 0px"});
    revealEls.forEach(function(el, i){
      el.style.setProperty("--i", i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if(counters.length && "IntersectionObserver" in window){
    var counted = new WeakSet();
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !counted.has(entry.target)){
          counted.add(entry.target);
          animateCount(entry.target);
        }
      });
    }, {threshold:.5});
    counters.forEach(function(c){ cio.observe(c); });
  }
  function animateCount(el){
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600, start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Ember particles in hero ---------- */
  var emberField = document.querySelector(".hero__embers");
  if(emberField){
    for(var i=0;i<18;i++){
      var e = document.createElement("span");
      e.className = "ember";
      e.style.left = (Math.random()*100) + "%";
      e.style.setProperty("--drift", (Math.random()*80-40) + "px");
      e.style.animationDelay = (Math.random()*9) + "s";
      e.style.animationDuration = (7 + Math.random()*6) + "s";
      e.style.opacity = (0.3 + Math.random()*0.5);
      emberField.appendChild(e);
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q = item.querySelector(".faq-item__q");
    var a = item.querySelector(".faq-item__a");
    if(!q || !a) return;
    q.addEventListener("click", function(){
      var isOpen = item.classList.contains("is-open");
      item.closest(".faq-list").querySelectorAll(".faq-item").forEach(function(other){
        other.classList.remove("is-open");
        other.querySelector(".faq-item__a").style.maxHeight = null;
        other.querySelector(".faq-item__q").setAttribute("aria-expanded","false");
      });
      if(!isOpen){
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded","true");
      }
    });
  });

  /* ---------- Tabs (product categories) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function(group){
    var buttons = group.querySelectorAll(".tab-nav button");
    var panels = group.querySelectorAll(".tab-panel");
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.classList.remove("is-active"); });
        panels.forEach(function(p){ p.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var target = group.querySelector("#" + btn.getAttribute("data-tab"));
        if(target) target.classList.add("is-active");
      });
    });
  });

  /* ---------- Product gallery thumbnail swap (product-detail.html) ---------- */
  var thumbs = document.querySelectorAll(".pd-gallery__thumbs .ph");
  var mainImg = document.querySelector(".pd-gallery__main .ph");
  if(thumbs.length && mainImg){
    thumbs.forEach(function(t){
      t.addEventListener("click", function(){
        thumbs.forEach(function(x){ x.classList.remove("is-active"); });
        t.classList.add("is-active");
        mainImg.style.opacity = 0;
        setTimeout(function(){ mainImg.style.opacity = 1; }, 150);
      });
    });
  }

  /* ---------- Gallery lightbox (simple) ---------- */
  var lightboxTriggers = document.querySelectorAll(".gallery-grid figure");
  if(lightboxTriggers.length){
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button><div class="lightbox__stage"></div>';
    lb.style.cssText = "position:fixed;inset:0;background:rgba(15,15,15,.92);z-index:9999;display:none;align-items:center;justify-content:center;padding:40px;";
    document.body.appendChild(lb);
    var stage = lb.querySelector(".lightbox__stage");
    var closeBtn = lb.querySelector(".lightbox__close");
    closeBtn.style.cssText = "position:absolute;top:24px;right:28px;color:#fff;font-size:2.2rem;line-height:1;background:none;border:none;cursor:pointer;";
    stage.style.cssText = "max-width:800px;width:100%;aspect-ratio:4/3;border-radius:14px;overflow:hidden;";

    lightboxTriggers.forEach(function(fig){
      fig.addEventListener("click", function(){
        var clone = fig.querySelector(".ph").cloneNode(true);
        clone.style.height = "100%";
        stage.innerHTML = "";
        stage.appendChild(clone);
        lb.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });
    function closeLB(){
      lb.style.display = "none";
      document.body.style.overflow = "";
    }
    closeBtn.addEventListener("click", closeLB);
    lb.addEventListener("click", function(e){ if(e.target === lb) closeLB(); });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeLB(); });
  }

  /* ---------- Contact / RFQ form validation ---------- */
  var form = document.querySelector("#contact-form, #rfq-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function(field){
        var errorEl = field.closest(".form-field").querySelector(".error");
        var value = field.value.trim();
        var fieldValid = true;

        if(!value) fieldValid = false;
        if(field.type === "email" && value){
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if(!fieldValid){
          valid = false;
          field.setAttribute("aria-invalid","true");
          if(errorEl) errorEl.textContent = field.type === "email" ? "Enter a valid email address." : "This field is required.";
        } else {
          field.removeAttribute("aria-invalid");
          if(errorEl) errorEl.textContent = "";
        }
      });

      if(!valid){
        var firstError = form.querySelector('[aria-invalid="true"]');
        if(firstError) firstError.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(function(){
        form.style.display = "none";
        var success = document.querySelector(".form-success");
        if(success) success.classList.add("is-shown");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 900);
    });

    form.querySelectorAll("input,textarea,select").forEach(function(f){
      f.addEventListener("input", function(){
        f.removeAttribute("aria-invalid");
        var errorEl = f.closest(".form-field") && f.closest(".form-field").querySelector(".error");
        if(errorEl) errorEl.textContent = "";
      });
    });
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Marquee duplicate for seamless loop ---------- */
  document.querySelectorAll(".marquee").forEach(function(m){
    if(m.dataset.cloned) return;
    m.innerHTML += m.innerHTML;
    m.dataset.cloned = "true";
  });

})();
