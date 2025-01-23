// FIXME: リリース前にconstをletまたはvarに変更し, can i useで各プロパティのブラウザサポートを確認する
type Args = {
    id: string;
    isDevelopmentMode?: boolean;
}

export async function embed({ id, isDevelopmentMode = false }: Args): Promise<void> {
    const recruitmentId = id;

    if (!recruitmentId) {
        console.error("Recruitment ID is required");
        return;
    }

    console.log("recruitmentId:", recruitmentId);

    // APIから埋め込み設定の情報を取得する
    let embedInfo = null;
    try {
        const domain = isDevelopmentMode ? "http://localhost:3000" : "https://fasterview.ai";

        // recruitmentId をクエリパラメータとして送信
        const res = await fetch(
            `${domain}/api/embed?id=${recruitmentId}`
        );
        if (!res.ok) {
            console.error("failed to get embed info");
            return;
        }

        // json を取得して定数 json に格納
        embedInfo = await res.json();
        console.log("got embed info:", embedInfo);
    } catch (error) {
        console.error("failed to get embed info:", error);
    }

    if (!embedInfo) {
        console.error("failed to get embed info");
        return;
    }

    // 埋め込み設定の情報をもとにHTMLを生成する
    const wrapperStyle = `
          position: fixed;        
          top: 200px;
          right: -360px;
          transition: 0.2s ease-in-out;
          z-index: 1000;
      `;

    const inlineStyle = `
          position: relative;
          display: flex;
          align-items: center;
      `;

    const buttonStyle = `
          position: absolute;
          left: 0;
          width: fit-content;
          height: fit-content;
          background-color: ${embedInfo.backgroundColor};
          color: ${embedInfo.textColor};
          border-radius: 8px 8px 0 0;
          padding: 8px 16px;
          white-space: nowrap;
          transform: rotate(-90deg);
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
      `;

    const iframeStyle = `
          width: 360px;
          height: 480px;
          border-radius: 8px 0 0 8px;
          border: 1px solid ${embedInfo.backgroundColor};
          border-right: none;
          overflow: hidden;
          z-index: 1000;
      `;

    const html = `
          <div id="fasterview-wrapper" style="${wrapperStyle}">
              <div style="${inlineStyle}">
                  <button id="fasterview-button" style="${buttonStyle}">${embedInfo.text}</button>
                  <iframe id="fasterview-iframe" style="${iframeStyle}" src="http://localhost:3000/user/answer/${recruitmentId}/embed"></iframe>
              </div>
          </div>
      `;

    const target = document.createElement("div");
    target.innerHTML = html;
    document.body.appendChild(target);

    // 埋め込み設定の情報をもとにHTMLを生成した結果をもとに, 要素を取得する
    const wrapper = document.getElementById("fasterview-wrapper");
    const button = document.getElementById("fasterview-button");
    const iframe = document.getElementById("fasterview-iframe");

    if (!wrapper || !button || !iframe) {
        console.error("failed to get embed elements");
        return;
    }

    // ボタンの位置を調整する
    // ボタンを-90度回転させているので, ちょうど横幅の半分を左にずらしたらボタンの半分までが見えて,
    // さらにボタンの半分を左にずらすと, ボタン全体が表示される
    // (button.offsetWidth + button.offsetHeight) / 2 でも良いが, 分かりやすいようにそれぞれの半分を足す
    button.style.left = `-${button.offsetWidth / 2 + button.offsetHeight / 2}px`;

    // ボタンをクリックしたら,
    // アンケートを開閉するためのクラスを付与/削除する
    const style = document.createElement("style");
    style.textContent = `
          .fasterview-open {
              display: flex !important;
              transition: all 0.2s ease-in-out !important;
              position: fixed !important; 
              top: 200px !important;
              right: 0px !important;
              z-index: 1000 !important;
          }
      `;
    document.body.appendChild(style);

    window.addEventListener("message", (event) => {
        if (event.data === `fasterview-close-button-${recruitmentId}`) {
            wrapper.classList.remove("fasterview-open");
        }
    });

    window.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target?.id) {
            console.error("event is null");
            return;
        }

        if (target.id === button.id) {
            wrapper.classList.toggle("fasterview-open");
        } else {
            wrapper.classList.remove("fasterview-open");
        }
    });
}
