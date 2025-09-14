let h=!1,s=null;async function u(){if(h&&m())return!0;const t=[{url:"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",checkGlobal:()=>window.html2pdf},{url:"https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",checkGlobal:()=>window.html2pdf},{url:"https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",checkGlobal:()=>window.html2pdf}];console.log("Attempting to load html2pdf.js from CDNs...");for(let r=0;r<t.length;r++){const o=t[r];console.log(`Trying CDN ${r+1}/${t.length}: ${o.url}`);try{if(await g(o.url,o.checkGlobal),m())return h=!0,console.log("html2pdf.js loaded and verified from:",o.url),!0}catch(n){console.warn(`Failed to load html2pdf.js from ${o.url}:`,n.message);continue}}throw console.error("All html2pdf.js CDN attempts failed"),new Error("Не удалось загрузить библиотеку html2pdf.js. Проверьте соединение с интернетом.")}function m(){try{return window.html2pdf&&typeof window.html2pdf=="function"}catch(t){return console.warn("Error checking html2pdf.js availability:",t),!1}}function g(t,r){return new Promise((o,n)=>{s&&document.head.removeChild(s),s=document.createElement("script"),s.src=t,s.async=!0,s.onload=()=>{setTimeout(()=>{r()?o():n(new Error("Library not found after loading"))},200)},s.onerror=()=>{n(new Error(`Failed to load from ${t}`))},document.head.appendChild(s)})}async function F(t,r="dxf-pro-report.pdf"){try{if(console.log("Generating PDF report with html2pdf.js..."),console.log("Report data:",t),m()||(console.log("html2pdf not available, loading..."),await u()),!t)throw new Error("No data provided for PDF generation");const{state:o,layout:n,files:a}=t;console.log("Data structure - state:",!!o,"layout:",!!n,"files:",!!a);const l=b(t);console.log("HTML content created, length:",l.length),(!l||l.length<100)&&console.warn("HTML content seems empty or incomplete");const e=document.createElement("div");e.style.position="absolute",e.style.left="-9999px",e.style.top="-9999px",e.style.width="800px",e.style.backgroundColor="white",e.style.color="black",e.style.fontFamily="Arial, sans-serif",e.style.padding="20px",e.innerHTML=l,document.body.appendChild(e),console.log("Container content length:",e.innerHTML.length),console.log("Container first 200 chars:",e.innerHTML.substring(0,200)),await new Promise(i=>setTimeout(i,100));const f={margin:[10,10,10,10],filename:r,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,allowTaint:!0,logging:!0,willReadFrequently:!0,onclone:function(i){console.log("Document cloned for PDF generation");const d=i.querySelector("div");d&&(d.style.position="relative",d.style.left="0",d.style.top="0")}},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}};console.log("Starting PDF generation with html2pdf..."),await new Promise((i,d)=>{try{window.html2pdf().set(f).from(e).save().then(()=>{console.log("PDF generated successfully"),document.body.removeChild(e),i()}).catch(p=>{console.error("Error generating PDF:",p),document.body.removeChild(e),d(new Error(`Ошибка генерации PDF: ${p.message}`))})}catch(c){console.error("Error creating PDF worker:",c),document.body.removeChild(e),d(new Error(`Ошибка создания PDF: ${c.message}`))}}),console.log("PDF report generated successfully")}catch(o){throw console.error("Error generating PDF report:",o),new Error(`Ошибка генерации PDF: ${o.message}`)}}function b(t){const{state:r,layout:o,files:n}=t,a=Array.isArray(n)?n:[],l=o||{};return a.length===0&&!l.sheets&&!l.totalSheets&&console.warn("Warning: Report data appears to be empty or incomplete"),`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Arial', 'Helvetica', sans-serif;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                margin: 0;
                padding: 20px;
                background-color: white;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #3498db;
                padding-bottom: 15px;
            }
            .header h1 {
                color: #2c3e50;
                font-size: 24px;
                margin: 0 0 10px 0;
            }
            .header .subtitle {
                color: #7f8c8d;
                font-size: 14px;
            }
            .section {
                margin-bottom: 25px;
            }
            .section h2 {
                color: #34495e;
                font-size: 16px;
                margin: 0 0 15px 0;
                border-left: 4px solid #3498db;
                padding-left: 10px;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
            }
            .data-table th,
            .data-table td {
                border: 1px solid #ddd;
                padding: 8px 12px;
                text-align: left;
            }
            .data-table th {
                background-color: #f8f9fa;
                font-weight: bold;
            }
            .data-table tr:nth-child(even) {
                background-color: #f8f9fa;
            }
            .summary-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
                padding: 5px 0;
                border-bottom: 1px solid #ecf0f1;
            }
            .summary-label {
                font-weight: bold;
                color: #2c3e50;
            }
            .summary-value {
                color: #34495e;
            }
            .layout-info {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin: 10px 0;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #bdc3c7;
                text-align: center;
                font-size: 10px;
                color: #7f8c8d;
            }
            .logo {
                font-size: 18px;
                font-weight: bold;
                color: #3498db;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">DXF PRO</div>
            <h1>Отчет по раскладке</h1>
            <div class="subtitle">Система анализа раскладки DXF файлов</div>
        </div>
        
        ${v(r,a)}
        ${w(a)}
        ${y(l)}
        ${x(l,a)}
        
        <div class="footer">
            <strong>Отчет сгенерирован автоматически</strong><br>
            Дата: ${new Date().toLocaleDateString("ru-RU")} | 
            Время: ${new Date().toLocaleTimeString("ru-RU")}<br>
            Система анализа раскладки DXF PRO v1.0
        </div>
    </body>
    </html>
  `}function v(t,r){return`
    <div class="section">
        <h2>Общая информация</h2>
        <div class="data-table">
            <table>
                <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                </tr>
                <tr>
                    <td>Количество файлов</td>
                    <td>${r?r.length:0}</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>${new Date().toLocaleDateString("ru-RU")}</td>
                </tr>
                <tr>
                    <td>Время создания</td>
                    <td>${new Date().toLocaleTimeString("ru-RU")}</td>
                </tr>
                <tr>
                    <td>Версия программы</td>
                    <td>1.0.0</td>
                </tr>
            </table>
        </div>
    </div>
  `}function w(t){return!t||t.length===0?`
      <div class="section">
        <h2>Результаты расчетов</h2>
        <p>Нет данных для отображения</p>
      </div>
    `:`
    <div class="section">
        <h2>Результаты расчетов</h2>
        <div class="data-table">
            <table>
                <tr>
                    <th>Файл</th>
                    <th>Время работ</th>
                    <th>Стоимость</th>
                    <th>Длина реза</th>
                    <th>Врезки</th>
                </tr>
                ${t.map(o=>{const n=o.calculatedCost||{},a=o.parsed||{};return`
      <tr>
        <td>${o.name||"Неизвестный файл"}</td>
        <td>${(n.timeForAllParts||0).toFixed(1)} мин</td>
        <td>${(n.costForAllParts||0).toFixed(0)} ₽</td>
        <td>${(a.totalLen||0).toFixed(3)} м</td>
        <td>${a.pierceCount||0}</td>
      </tr>
    `}).join("")}
            </table>
        </div>
    </div>
  `}function y(t){return t?`
    <div class="section">
        <h2>Информация о раскладке</h2>
        <div class="layout-info">
            <div class="summary-item">
                <span class="summary-label">Размер листа:</span>
                <span class="summary-value">${t.sheetWidth||0} x ${t.sheetHeight||0} мм</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Количество листов:</span>
                <span class="summary-value">${t.sheets||t.totalSheets||1}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Эффективность раскладки:</span>
                <span class="summary-value">${(t.efficiency||0).toFixed(1)}%</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Общая площадь:</span>
                <span class="summary-value">${((t.sheetWidth||0)*(t.sheetHeight||0)*(t.sheets||1)/1e6).toFixed(2)} м²</span>
            </div>
        </div>
    </div>
  `:`
      <div class="section">
        <h2>Информация о раскладке</h2>
        <p>Данные о раскладке недоступны</p>
      </div>
    `}function x(t,r){let o=0,n=0,a=0,l=0;return r&&r.length>0&&r.forEach(e=>{e.calculatedCost&&(o+=e.calculatedCost.timeForAllParts||0,n+=e.calculatedCost.costForAllParts||0),e.parsed&&(a+=e.parsed.totalLen||0,l+=e.parsed.pierceCount||0)}),`
    <div class="section">
        <h2>Итоговая сводка</h2>
        <div class="data-table">
            <table>
                <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                </tr>
                <tr>
                    <td>Общее время работ</td>
                    <td>${o.toFixed(1)} мин</td>
                </tr>
                <tr>
                    <td>Общая стоимость</td>
                    <td>${n.toFixed(0)} ₽</td>
                </tr>
                <tr>
                    <td>Общая длина реза</td>
                    <td>${a.toFixed(3)} м</td>
                </tr>
                <tr>
                    <td>Общее количество врезок</td>
                    <td>${l}</td>
                </tr>
                <tr>
                    <td>Количество листов</td>
                    <td>${(t==null?void 0:t.sheets)||(t==null?void 0:t.totalSheets)||1}</td>
                </tr>
            </table>
        </div>
    </div>
  `}export{F as generatePDFReport};
