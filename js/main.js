/**
 * 鑫恒工业 - 官网交互脚本
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==============================
  //  1. 导航栏滚动效果
  // ==============================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;

    // 导航栏背景变化
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 高亮当前区域对应的导航链接
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ==============================
  //  2. 移动端菜单切换
  // ==============================
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  // 点击导航链接后关闭菜单
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });

  // ==============================
  //  3. 数字滚动动画
  // ==============================
  function animateNumbers() {
    var numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var current = parseInt(el.textContent, 10) || 0;
      if (isNaN(target) || current >= target) return;

      var increment = Math.ceil(target / 40);
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 30);
      el.dataset.animated = 'true';
    });
  }

  // 滚动到统计区域时触发
  var statsObserved = false;
  var statsSection = document.querySelector('.hero-stats');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !statsObserved) {
        statsObserved = true;
        animateNumbers();
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    observer.observe(statsSection);
  }

  // ==============================
  //  4. 联系表单提交
  // ==============================
  var contactForm = document.getElementById('contactForm');
  var formTip = document.getElementById('formTip');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // 模拟提交
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;

      setTimeout(function () {
        formTip.textContent = '感谢您的留言！我们会尽快与您联系。';
        formTip.className = 'form-tip success';
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // 3秒后清除提示
        setTimeout(function () {
          formTip.textContent = '';
          formTip.className = 'form-tip';
        }, 4000);
      }, 1000);
    });
  }

  // ==============================
  //  5. 平滑锚点跳转（移动端偏移修正）
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
