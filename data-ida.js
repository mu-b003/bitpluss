allVulnerabilities.push(
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


);

