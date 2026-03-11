// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
  // 导航链接平滑滚动
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // 阻止默认跳转
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // 平滑滚动到目标区域
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        // 给当前激活的导航添加样式
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // 下载按钮点击提示、防重复点击
  const downloadBtns = document.querySelectorAll('.download-btns .btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      this.classList.add('disabled');
      console.log(`点击了${this.textContent}按钮，即将跳转至下载页`);
      // 自定义提示
      const tip = document.createElement('div');
      tip.className = 'click-tip';
      tip.textContent = `正在跳转${this.textContent}页面...`;
      document.body.appendChild(tip);
      // 3秒后移除提示并恢复按钮状态
      setTimeout(() => {
        tip.remove();
        this.classList.remove('disabled');
      }, 3000);
    });
  });

  // 滚动监听：导航栏背景加深+回到顶部按钮
  const header = document.querySelector('.header');
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.textContent = '↑';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 50px;
    right: 30px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ffea00;
    color: #111;
    border-radius: 50%;
    text-decoration: none;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  `;
  document.body.appendChild(backToTop);

  // 回到顶部逻辑
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 滚动事件处理
  window.addEventListener('scroll', function() {
    // 导航栏背景加深
    if (window.scrollY > 100) {
      header.style.background = 'rgba(15, 12, 25, 1)';
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      header.style.background = 'rgba(15, 12, 25, 0.95)';
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }

    // 滚动时更新导航激活状态
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // hover动画
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });


  console.log('神鸟与金冠专题站加载完成');
});