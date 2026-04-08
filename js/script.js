

// SPナビゲーションの開閉
const globalNavBtn = document.querySelector('.l-header__navBtn');
const globalNavCloseBtn = document.querySelector('.l-header__navClose');

globalNavBtn.addEventListener('click', () => {
    document.body.classList.add('is-open');
});

globalNavCloseBtn.addEventListener('click', () => {
    document.body.classList.remove('is-open');
});




// 豆サンプル・モーダル

document.addEventListener('DOMContentLoaded', () => {
    const displayContainer = document.getElementById('selected-beans-list');
    const realInput = document.getElementById('real-bean-input');
    const modalBeans = document.getElementById('js-modalBeans');
    const openBtn = document.querySelector('.p-contactFrom__beansButton .c-btn');
    const closeBtn = document.getElementById('js-modalBeans-close');
    const closeFooter = document.getElementById('js-modalBeans-close-footer');

    // --- 関数：選択された豆を反映させる ---
    function updateSelectedBeansList() {
        const activeLists = document.querySelectorAll('.l-modalBeans__list.is-active');
        const realInput = document.getElementById('real-bean-input');

        // 表示エリアを一旦空にする
        displayContainer.innerHTML = '';

        // 【ここを修正】豆が選ばれていない時は、何もせずに戻る
        if (activeLists.length === 0) {
            realInput.value = ''; // 隠し入力も空にする
            return; // ここで処理を終了。これ以降のタグ生成が行われない
        }

        // 豆が選ばれている時だけ、以下の処理が走る
        let selectedNames = [];
        activeLists.forEach(list => {
            const beanNameEn = list.querySelector('.c-photoCard__subTitleEn').textContent;
            const beanNameMain = list.querySelector('.c-photoCard__mainTitle').textContent;
            const fullName = `${beanNameEn} (${beanNameMain})`;

            selectedNames.push(fullName);

            const item = document.createElement('div');
            item.className = 'selected-bean-item';
            item.innerHTML = `<span>●</span> ${fullName}`;
            displayContainer.appendChild(item);
        });

        realInput.value = selectedNames.join(', ');
    }

    // --- 関数：モーダルを閉じる ---
    const closeModal = () => {
        modalBeans.classList.remove('is-open');
        document.body.style.overflow = '';
        updateSelectedBeansList(); // ここで呼び出す
    };

    // --- イベントリスナー ---

    // 1. モーダルを開くボタン
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalBeans.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    }

    // 2. 閉じるボタン（右上などの×ボタン）
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // 3. フッターにある閉じるボタン
    if (closeFooter) {
        closeFooter.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // 豆カードの選択挙動
    const beanLists = document.querySelectorAll('.l-modalBeans__list');
    beanLists.forEach(list => {
        list.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('is-active');

            const img = this.querySelector('.c-checkBtn img');
            if (this.classList.contains('is-active')) {
                img.src = 'img/Icon_stash_check-solid.svg';
            } else {
                img.src = 'img/Icon_entypo_plus.svg';
            }
        });
    });
});




// News詳細の表示

const btns = document.querySelectorAll('.js-switch-btn');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. 今クリックされたニュースとその詳細を特定
        const currentNews = btn.closest('.js-news');
        const currentOpen = currentNews.nextElementSibling;

        // 2. すべてのニュースと詳細をいったん「閉じた状態」にリセット
        document.querySelectorAll('.js-news').forEach(news => {
            if (news !== currentNews) { // 今クリックしたもの以外
                news.classList.add('is-show');
                news.classList.remove('is-hide');
            }
        });
        document.querySelectorAll('.js-newsOpen').forEach(open => {
            if (open !== currentOpen) { // 今クリックしたもの以外
                open.classList.add('is-hide');
                open.classList.remove('is-show');
            }
        });

        // 3. 今クリックしたニュースの表示を切り替える
        currentNews.classList.toggle('is-show');
        currentNews.classList.toggle('is-hide');
        currentOpen.classList.toggle('is-show');
        currentOpen.classList.toggle('is-hide');
    });
});


// --- 「閉じる」ためのコード ---

// ✕ボタン（c-newsClose）と 下のcloseボタン（c-newsCloseButton）をまとめて取得
const closeBtns = document.querySelectorAll('.c-newsClose, .c-newsCloseButton');

closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // aタグ（closeボタン）でページが跳ね上がるのを防ぐ

        // 1. 今開いている「詳細エリア」を特定
        const currentOpen = btn.closest('.js-newsOpen');

        // 2. その「1つ前」にある「ニュースカード」を特定
        const currentNews = currentOpen.previousElementSibling;

        // 3. クラスを付け替えて、表示を元に戻す
        currentOpen.classList.add('is-hide');    // 詳細を隠す
        currentOpen.classList.remove('is-show'); // 詳細の表示を消す

        currentNews.classList.add('is-show');    // カードを出す
        currentNews.classList.remove('is-hide'); // カードの隠しを解く
    });
});




// ヘディングタイトルアニメーション
// const heading = document.querySelector('.c-headingSp');

// if(heading){
//     const keyframe = {
//         opacity: [0, 1],
//         translate: ['0 50px', 0],
//     };
//     const options = {
//         duration: 2000,
//         easing: 'ease',
//     };

//     heading.animate(keyframe, options);
// }




// セクションタイトルアニメーション
// セクションタイトルアニメーション
const sectionTitle = document.querySelector('.c-sectionTitleSp');

// deferで読み込んでも、要素がないページではnullになるのでifで囲む
if (sectionTitle) {
    const keyframe2 = {
        opacity: [0, 1],
        translate: ['0 50px', 0],
    };
    const options2 = {
        duration: 2000,
        easing: 'ease',
    };
    sectionTitle.animate(keyframe2, options2);
}






// TOPのlogoと挨拶文のアニメーション
const logo = document.querySelector('.l-header__logo');
const greeting = document.querySelector('#p-top__greeting');

const leftkeyframe = {
    opacity: [0, 1],
    // 回りながら
    // rotate:['90deg', 0],

    // 横からふわ
    translate: ['-12.9rem 0', 0],

    // 大きいところから小さくなって入ってくる
    // rotate: ['5deg', '0deg'],
    // scale: [1.5, 1],

    filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],
}
const leftoptions = {
    duration: 1500,
    fill: 'forwards',
    // delay: 300,
};


if (logo) { // 要素が存在するかチェック
    logo.animate(leftkeyframe, leftoptions);
}
if (greeting) {
    greeting.animate(leftkeyframe, leftoptions);
}




// TOP写真のアニメーション
const topPic = document.querySelector('.p-top__pic');
const HeaderNav = document.querySelector('.l-header__nav');


if (topPic) { // 要素が存在するかチェック

    const keyframe = {
        opacity: [0, 1],
        // 回りながら
        // rotate:['90deg', 0],

        // 横からふわ
        // translate: ['20rem 0', 0],
        // transform: ['translateX(120px)', 'translateX(0)'],


        filter: ['blur(0.5rem) brightness(180%)', 'blur(0px) brightness(100%)'],
    }
    const options = {
        duration: 1500,
        fill: 'forwards',
        easing: 'ease-out'
        // delay: 300,
    };

    topPic.animate(keyframe, options);
}




// TOPナビゲーションのアニメーション
if (HeaderNav) { // 要素が存在するかチェック

    const keyframe = {
        opacity: [0, 1],
        // 回りながら
        // rotate:['90deg', 0],

        // 横からふわ
        translate: ['0 -4.4rem', 0],

        filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],

    }
    const options = {
        duration: 1500,
        fill: 'forwards',
        // delay: 300,
    };

    HeaderNav.animate(keyframe, options);
}










// Aboutページのアニメーション
// const CommitLefts = document.querySelectorAll('.js__aboutCommitDetail__left');
// const CommitRights = document.querySelectorAll('.js__aboutCommitDetail__right');


// CommitLefts.forEach(CommitLeft => {
//     if (CommitLeft) {
//         const keyframe = {
//             opacity: [0, 1],

//             translate: ['-12.9rem 0', 0],

//             filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],
//         }
//         const options = {
//             duration: 2000,
//             fill: 'forwards',
//             // delay: 300,
//         };
//         CommitLeft.animate(keyframe, options);
//     }
// });


// CommitRights.forEach(CommitRight => {
//     if (CommitRight) {
//         const keyframe = {
//             opacity: [0, 1],

//             translate: ['12.9rem 0', 0],
//             // scale:[1.5, 1],
//             filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],
//         }
//         const options = {
//             duration: 2000,
//             fill: 'forwards',
//             // delay: 300,
//         };
//         CommitRight.animate(keyframe, options);
//     }
// });



// 1. 監視対象の要素をすべて取得
const CommitLefts = document.querySelectorAll('.js__aboutCommitDetail__left');
const CommitRights = document.querySelectorAll('.js__aboutCommitDetail__right');

// 2. 共通のオプション設定
const observerOptions = {
    root: null,         // 画面全体を監視
    rootMargin: '0px',
    threshold: 0.2      // 要素が20%見えたら実行
};

// 3. 監視した時の動きを定義
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 画面内に入ったら実行
        if (entry.isIntersecting) {
            const target = entry.target;

            // 左から来るアニメーション
            if (target.classList.contains('js__aboutCommitDetail__left')) {
                target.animate({
                    opacity: [0, 1],
                    translate: ['-12.9rem 0', 0],
                    filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],
                }, { duration: 1200, fill: 'forwards' });
            }

            // 右から来るアニメーション
            if (target.classList.contains('js__aboutCommitDetail__right')) {
                target.animate({
                    opacity: [0, 1],
                    translate: ['12.9rem 0', 0],
                    filter: ['blur(0.2rem) brightness(110%)', 'blur(0px) brightness(100%)'],
                }, { duration: 1500, fill: 'forwards' });
            }

            // 💡 【修正】疑似要素を探すのではなく、テキストの親要素にクラスを足す
            const textElement = target.closest('.p-aboutCommitDetail').querySelector('.p-aboutCommitDetail__text');
            if (textElement) {
                textElement.classList.add('is-active'); // 「アクティブ」という目印をつける
            }

            // 一度アニメーションしたら監視を解除（何度も動かさない場合）
            observer.unobserve(target);
        }
    });
}, observerOptions);

// 4. 全ての要素を監視に登録
CommitLefts.forEach(el => observer.observe(el));
CommitRights.forEach(el => observer.observe(el));







// 豆詳細・モーダル

window.addEventListener('DOMContentLoaded', () => {
// 要素の取得
const openBtns = document.querySelectorAll('#js-modal-open');
const modal = document.getElementById('js-modalDetail');
const closeBtn = document.getElementById('js-modalDetail-close');
const closeLink = document.querySelector('.l-modalDetail .c-SubBtnSp');

// モーダルを開く処理
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('is-active');
    });
});

// モーダルを閉じる処理（共通関数）
const closeModal = () => {
    modal.classList.remove('is-active'); // 「is-active」クラスを削除
};

// 閉じるボタン（×）をクリック
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// 下の「close」リンクをクリック
if (closeLink) {
    closeLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
}

// モーダルの外側（背景）をクリックしても閉じるようにする場合
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
});