var tipuesearch = {"pages": [{'title': 'About', 'text': 'cmsite: wcms use  https://github.com/mdecycu/cmsimde  as submodule \n Github倉儲 \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'HW', 'text': '', 'tags': '', 'url': 'HW.html'}, {'title': 'w14', 'text': 'HW \n # 導入 ast 模組是希望利用其 literal_eval() 將 dict 格式的字串轉為 dict 資料型別\n# 以利隨後的取值運算\nimport ast\nfrom browser import document\n \nclass quiz:\n    def __init__(self, cname, url):\n        self.cname = cname\n        self.url = url\n \n    # 定義一個函式, 以班級代號字串作為輸入, 可以傳回各班修課學員的學號數列\n    def get_stud(self):\n        # 將課程的班級代號字串作為 dict 的 key, 而 2022 fall 的課程代號作為對應值\n        # 使用者可以利用班級代號從 courses dict 取出課程代號\n        courses = {"1a": "0747", "1b": "0761", "2a": "0773", "2b": "0786"}\n        # 利用 c_name 從 courses 得到該學期的課程代號\n        c = courses[self.cname]\n        # 利用課程代號從學校教務主機取的該班修課人員名單\n        curl = "https://nfu.cycu.org/?semester=1111&courseno=" + c + "&column=True"\n        # 讀出各修課人員資料後, 以跳行符號切割, 得到的 data 為數列\n        data = open(curl).read().split("\\n")\n        # 因為最後一筆資料為空字串, 因此利用數列運算將其去除\n        stud = data[:-1]\n        # get_stud() 函式最後將對應班級的修課人員學號以數列格式傳回\n        return stud\n         \n    def get_score(self):\n        # 利用 open() 與 read() 讀取考試結果 JSON 檔案\n        json_data = open(self.url).read()\n        # 利用 ast.literal_eval() 將字串 dict, 轉為程式可用的 dict 資料型別\n        big_dict = ast.literal_eval(json_data)\n        # 從 big_dict 中, 取出 body 中的 testuser 欄位資料\n        data = big_dict["body"]["testuser"]\n        # 定義一個空 dict 資料變數, 隨後利用迴圈逐一將學號作為 key, 考試成績為 valude\n        # 組成 quiz_dict 的資料內容, 以便之後可以用學號當作輸入, 取得該員考試成績\n        quiz_dict = {}\n        for i in data:\n            # data 資料中的 user_name 為考試學員的帳號, 也就是學號\n            stud_id = data[i]["user_name"]\n            # data 資料中的 total_score 欄位為考試成績\n            # 因為考試成績為字串, 先轉為浮點數後, 再轉為整數\n            stud_score = int(float(data[i]["total_score"]))\n            # 逐一以學號為 key, 考試成績為對應 value, 將資料放入 quiz_dict\n            quiz_dict[stud_id] = stud_score\n        # 取得各學員的考試成績 quiz_dict 後, 將資料傳回\n        return quiz_dict\n \ntry:\n    url = document.query["url"]\nexcept:\n    url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/a6825f13b1bb0b61e09e74dd117729eefe1d947f/20221110_cp1b_w10_quiz.json"\n \ntry:\n    cname =document.query["cname"]\nexcept:\n    cname = "1b"\n \ncpb_w14 = quiz(cname, url)\ncp_stud = cpb_w14.get_stud()\ncp_score = cpb_w14.get_score()\nprint(cp_stud, cp_score) \n', 'tags': '', 'url': 'w14.html'}, {'title': 'w11', 'text': 'HW \n import ast\n \n# get stud_list first\n \ndef get_stud(c_name):\n    courses = {"1a": "0747", "1b": "0761", "2a": "0773", "2b": "0786"}\n    c = courses[c_name]\n    url = "https://nfu.cycu.org/?semester=1111&courseno=" + c + "&column=True"\n    data = open(url).read().split("\\n")\n    stud = data[:-1]\n    return stud\n     \ncp_stud = get_stud("1a")\n \n# get w10 quiz result\ncp_w10_quiz_url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/9e8bf693a2805631aa12992db4d4f23e0f64e868/2022_1112_cp1a_w10_quiz.json"\n \ndef get_score(url):\n    json_data = open(url).read()\n    big_dict = ast.literal_eval(json_data)\n    data = big_dict["body"]["testuser"]\n    quiz_dict = {}\n    for i in data:\n        stud_id = data[i]["user_name"]\n        stud_score = int(float(data[i]["total_score"]))\n        quiz_dict[stud_id] = stud_score\n    return quiz_dict\n     \ncp_quiz = get_score(cp_w10_quiz_url)\ncp_abs = []\nfor stud in cp_stud:\n    try:\n        print(stud, cp_quiz[stud])\n    except:\n        # 缺考者沒有 quiz 成績\n        print(stud, "缺")\n        cp_abs.append(stud)\n# 列出缺考名單\nprint("="*20)\nprint("以下為 w10 缺考名單:")\nfor stud in cp_abs:\n    print(stud) \n \n', 'tags': '', 'url': 'w11.html'}, {'title': 'w6', 'text': 'hw \n from browser import document, html\n \nbrython_div1 = document["brython_div1"]\n"""\nbrython_div1 <= html.BUTTON("hello")\nbrython_div1 <= html.BR()\nbrython_div1 <= html.A("google", href="https://google.com")\n"""\n \nurl = "https://mde.tw/studlist/2022fall/1a.txt"\ndata = open(url).read().split("\\n")\nmdecp2022 = "https://mdecp2022.github.io/site-"\ndata = data[1:-1]\nfor i in data:\n    stud = i.split("\\t")\n    stud_num = stud[0]\n    github_acc = stud[1]\n    #print(stud_num, github_acc)\n    if github_acc == "":\n        github_acc = stud_num\n    site = mdecp2022 + github_acc\n    link = html.A(stud_num, href=site)\n    brython_div1 <= link\n    brython_div1 <= html.BR()\n\n \n \n', 'tags': '', 'url': 'w6.html'}, {'title': 'w15', 'text': '\n \n 為何學習計算機程式需要建立個人倉儲? A:用來建立個人網站 \n 全球資訊網能夠提供甚麼功能或有什麼優點? A:由眾多相連結的超文字組合而成的資訊系統，能夠保護個人隱私 \n Replit, stud.cycu.org 與 localhost 分別代表甚麼? A:Replit在網頁上編輯動態網站 \xa0\xa0 stud.cycu.org連接至學校網站 \xa0\xa0 localhost在可攜環境上編輯往上，僅在push時需連接網路 \n https, ssh 到底提供使用者那些功能或優點? A:https是網路安全傳輸協議，可在瀏覽器和網站服務器的傳輸加密 \xa0\xa0 ssh是加密的網路傳輸協定，在不安全的網路提供安全的傳輸環境給網路服務 \n Brython 與 Python 有甚麼差別? A:Brython是在瀏覽器中使用的Python \n 能夠直接在瀏覽器中以 Brython 繪製中華民國國旗, 或模擬綠色方塊在方塊格點中任意移動, 代表甚麼? A:能在網站上繪製出平面圖形並運用不同顏色 \n 變數, 字串, 整數, 浮點數, 數列, Tuple, Dictionary, 函式, 重複迴圈, class, 物件導向, 資料庫, 這些名詞對您而言代表甚麼? A:在書寫程式時使用這些名詞，能夠讓編碼變得簡潔 \n \n \n', 'tags': '', 'url': 'w15.html'}, {'title': 'w13', 'text': 'hwinput(), float() 與 type() 的用法 \n \'\'\'\nf = c*9/5 + 32\nc = (f-32)*5/9\n\'\'\'\nc = input("請輸入攝氏溫度值")\nc = float(c)\nprint(c, type(c)) \n 利用數學運算將攝氏轉為華氏 \n \n \'\'\'\nf = c*9/5 + 32\nc = (f-32)*5/9\n\'\'\'\nc = input("請輸入攝氏溫度值")\nc = float(c)\n#print(c, type(c))\nf = c*9/5 + 32\nprint(c, f) \n \n', 'tags': '', 'url': 'w13.html'}, {'title': 'w12', 'text': 'hw 第一個練習 \n # Brython 的 input() 可以接受輸入提示字串, 跳出瀏覽器輸入表單後, 將輸入內容以字串取回\nuser_input_temp = input("請輸入攝氏溫度值:")\n# 接著列出 user_input_temp 變數的資料型別\nprint(type(user_input_temp)) \n hw 第二個練習 \n # Brython 的 input() 可以接受輸入提示字串, 跳出瀏覽器輸入表單後, 將輸入內容以字串取回\nuser_input_temp = input("請輸入攝氏溫度值:")\n# 接著列出 user_input_temp 變數的資料型別\nprint(type(user_input_temp))\n# 到這裡已知利用 input() 函式將傳回字串, 接著以 float() 將字串轉為浮點數\nuser_input_temp = float(user_input_temp)\n# 因為攝氏溫度乘上 9/5 之後再加上 32 就可以得到對應的華氏溫度值\nFahrenheit = (user_input_temp*9/5) + 32\n# 到這裡, Fahrenheit 資料型別為浮點數, 而 user_input_temp 在第 8 行也轉為浮點數\n# 要將兩個浮點數與字串相加, 都必須透過 str() 轉為字串\nprint("攝氏 " + str(user_input_temp) + " 度, 等於華氏 " + str(Fahrenheit) + " 度.") \n \n', 'tags': '', 'url': 'w12.html'}, {'title': 'w13-1', 'text': '\n \n  以下事先在頁面中加入 id="brython_div" 的 div 標註\n之後可利用 Brython 的 document 模組與此 html 標註對應\n \n  利用 html 建立一個 id="btn1" 的按鈕  \n 取使用者輸入 \n \n \n \n \n', 'tags': '', 'url': 'w13-1.html'}, {'title': 'Brython', 'text': 'https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation \n Variables \n Comments \n Numbers \n Strings \n print \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束 ', 'tags': '', 'url': 'Brython.html'}]};