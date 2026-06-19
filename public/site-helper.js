// public/site-helper.js
// 页面增强脚本：提示卡片、关键词徽章和访问说明

(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://official-site-aiyouxi.com.cn',
    keywords: ['爱游戏', 'h5游戏', 'web体验', '互动娱乐'],
    cardTitle: '温馨提示',
    cardContent: '本站为爱游戏官方展示页面，如需了解更多内容请访问官网。'
  };

  // ---------- 辅助函数 ----------
  function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
      if (key === 'className') {
        el.className = val;
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign(el.style, val);
      } else if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), val);
      } else {
        el.setAttribute(key, val);
      }
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });
    return el;
  }

  // ---------- 提示卡片 ----------
  function buildCard() {
    const card = createElement('div', {
      className: 'site-helper-card',
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '320px',
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        zIndex: '9999',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333'
      }
    });

    const closeBtn = createElement('span', {
      style: {
        position: 'absolute',
        top: '8px',
        right: '12px',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#999',
        fontWeight: 'bold'
      },
      on: {
        click: function(e) {
          card.style.display = 'none';
        }
      }
    }, ['×']);

    const title = createElement('h4', {
      style: {
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: 600
      }
    }, [CONFIG.cardTitle]);

    const content = createElement('p', {
      style: {
        margin: '0 0 12px 0',
        color: '#555'
      }
    }, [CONFIG.cardContent]);

    const link = createElement('a', {
      href: CONFIG.siteUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      style: {
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: '#4a90d9',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '13px'
      }
    }, ['前往官网 →']);

    card.appendChild(closeBtn);
    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(link);
    document.body.appendChild(card);
  }

  // ---------- 关键词徽章 ----------
  function buildBadges() {
    const badgeContainer = createElement('div', {
      className: 'site-helper-badges',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: 'center',
        margin: '20px 0 10px'
      }
    });

    CONFIG.keywords.forEach(kw => {
      const badge = createElement('span', {
        style: {
          padding: '4px 12px',
          backgroundColor: '#f0f7ff',
          border: '1px solid #b3d4fc',
          borderRadius: '20px',
          fontSize: '13px',
          color: '#2c6b9e',
          fontWeight: 500
        }
      }, [kw]);
      badgeContainer.appendChild(badge);
    });

    // 插入到页面主体区域（如果存在 main 或 content）
    const main = document.querySelector('main, .content, #content, article') || document.body;
    main.insertBefore(badgeContainer, main.firstChild);
  }

  // ---------- 访问说明 ----------
  function buildAccessNote() {
    const note = createElement('div', {
      className: 'site-helper-note',
      style: {
        padding: '12px 16px',
        margin: '20px auto',
        maxWidth: '600px',
        backgroundColor: '#f9f9fb',
        borderLeft: '4px solid #4a90d9',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#444',
        lineHeight: '1.6'
      }
    });

    const strong = createElement('strong', {}, ['访问说明：']);
    const text = document.createTextNode(
      `本页面是爱游戏官方站点 ${CONFIG.siteUrl} 的辅助入口。所有内容仅供展示，如需完整服务请访问官方网站。`
    );

    note.appendChild(strong);
    note.appendChild(text);

    const main = document.querySelector('main, .content, #content, article') || document.body;
    main.appendChild(note);
  }

  // ---------- 初始化 ----------
  function init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        buildCard();
        buildBadges();
        buildAccessNote();
      });
    } else {
      buildCard();
      buildBadges();
      buildAccessNote();
    }
  }

  init();
})();