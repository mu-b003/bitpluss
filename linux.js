allVulnerabilities.push(
{
    id: 51,
    title: "Linux System Course",
    summary: `
        <p>
            <b>Linux</b> is an open-source operating system built on the Linux Kernel, first developed by
            <b>Linus Torvalds</b> in 1991. It powers most of the world's servers, networking devices,
            and smartphones through Android. This course covers everything you need to master Linux
            from the ground up.
        </p>

        <!-- ───────────────────────────────────────────── -->
        <h3>Why Learn Linux?</h3>

        <p>Mastering Linux is essential in fields such as:</p>
        <p>1. Penetration testing and cybersecurity.</p>
        <p>2. Server and network administration.</p>
        <p>3. Software development and DevOps.</p>
        <p>4. Artificial intelligence and big data.</p>

        <!-- ───────────────────────────────────────────── -->
        <h3>Popular Linux Distributions:</h3>

        <pre><code>Ubuntu       - Beginner-friendly general use
Kali Linux   - Penetration testing focused
Debian       - Stable server deployments
CentOS/RHEL  - Enterprise environments
Arch Linux   - Advanced users
Fedora       - Developers</code></pre>

        <!-- ───────────────────────────────────────────── -->
        <h3>Linux File System Structure:</h3>

        <pre><code>/           - Root - the base of everything
├── /bin    - Essential commands
├── /etc    - Configuration files
├── /home   - User home directories
├── /root   - Root user's home directory
├── /var    - Variable files (logs, etc.)
├── /tmp    - Temporary files
├── /usr    - User programs
├── /dev    - Device files
└── /proc   - Process information</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Navigating the File System ──</h3>

        <p>
            Navigation in Linux relies on a set of core commands that every user — beginner or
            expert — must master.
        </p>

        <p><b>pwd – Print Working Directory:</b></p>

        <pre><code>$ pwd
/home/user/Documents</code></pre>

        <p><b>ls – List directory contents:</b></p>

        <pre><code>$ ls              # list files
$ ls -l           # detailed listing
$ ls -la          # include hidden files
$ ls -lh          # human-readable sizes
$ ls /etc         # list a specific directory</code></pre>

        <p><b>cd – Change Directory:</b></p>

        <pre><code>$ cd /home/user   # go to an absolute path
$ cd ..           # go one level up
$ cd ~            # go to home directory
$ cd -            # go to previous directory
$ cd /            # go to root</code></pre>

        <h3>Understanding Paths:</h3>

        <p><b>Absolute Path:</b> starts from root <code>/</code></p>
        <pre><code>/home/user/Documents/file.txt</code></pre>

        <p><b>Relative Path:</b> starts from your current location</p>
        <pre><code>Documents/file.txt
../Downloads/image.png</code></pre>

        <h3>Useful Terminal Shortcuts:</h3>

        <pre><code>Tab          - Auto-complete
Ctrl + C     - Stop current command
Ctrl + L     - Clear the screen
Ctrl + A     - Jump to beginning of line
Ctrl + E     - Jump to end of line
↑ / ↓        - Browse command history</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Managing Files and Directories ──</h3>

        <p><b>Creating Files and Directories:</b></p>

        <pre><code># Create an empty file
$ touch file.txt

# Create a file with content
$ echo "Hello Linux" > file.txt

# Create a directory
$ mkdir myfolder

# Create nested directories
$ mkdir -p parent/child/grandchild</code></pre>

        <p><b>Copying Files:</b></p>

        <pre><code>$ cp file.txt /home/user/backup/
$ cp file.txt newfile.txt
$ cp -r myfolder/ /backup/
$ cp -rp myfolder/ /backup/    # preserve permissions</code></pre>

        <p><b>Moving and Renaming:</b></p>

        <pre><code>$ mv file.txt /home/user/Documents/
$ mv oldname.txt newname.txt
$ mv myfolder/ /var/www/</code></pre>

        <p><b>Deleting Files:</b></p>

        <pre><code>$ rm file.txt
$ rm -f file.txt          # force delete, no prompt
$ rmdir emptyfolder       # remove empty directory
$ rm -rf myfolder/        # remove directory and contents — DANGEROUS!</code></pre>

        <p><b>Text Editors:</b></p>

        <pre><code>$ nano file.txt    # easy for beginners
$ vim file.txt     # powerful for advanced users</code></pre>

        <h3>Essential vim Commands:</h3>

        <pre><code>i          - Enter Insert Mode
Esc        - Exit Insert Mode
:w         - Save file
:q         - Quit
:wq        - Save and quit
:q!        - Quit without saving
dd         - Delete current line
yy         - Copy current line
p          - Paste</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Permissions and User Management ──</h3>

        <p>
            Linux uses a precise permission system that determines who can read, modify, or execute
            files. Understanding this system is fundamental to system security and administration.
        </p>

        <h3>Reading File Permissions:</h3>

        <pre><code>$ ls -l
-rwxr-xr-- 1 user group 1234 Jan 01 file.txt
│└─┬──┘└─┬──┘└─┬──┘
│  │      │      └── Others permissions
│  │      └───────── Group permissions
│  └──────────────── Owner permissions
└─────────────────── File type (- file, d directory)</code></pre>

        <h3>Permission Symbols:</h3>

        <pre><code>r = Read    = 4
w = Write   = 2
x = Execute = 1
- = No permission = 0

Example: rwxr-xr--
Owner: rwx = 7  (read + write + execute)
Group: r-x = 5  (read + execute)
Other: r-- = 4  (read only)</code></pre>

        <h3>Changing Permissions – chmod:</h3>

        <pre><code>$ chmod 755 file.sh    # rwxr-xr-x
$ chmod 644 file.txt   # rw-r--r--
$ chmod 600 secret.txt # rw-------
$ chmod +x file.sh     # add execute permission
$ chmod -w file.txt    # remove write permission</code></pre>

        <h3>Changing Ownership – chown:</h3>

        <pre><code>$ chown user file.txt
$ chown user:group file.txt
$ chown -R user:group /folder/</code></pre>

        <h3>User Management Commands:</h3>

        <pre><code>$ sudo useradd username
$ sudo adduser username       # with setup wizard
$ sudo passwd username        # set password
$ sudo userdel username
$ sudo userdel -r username    # also removes home dir
$ id username
$ whoami</code></pre>

        <h3>Using sudo:</h3>

        <pre><code>$ sudo apt update             # run as root
$ sudo su                     # switch to root
$ sudo -u username command    # run as another user</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Package Management ──</h3>

        <p>
            Linux provides advanced package managers that allow you to install, update, and remove
            software easily over the internet.
        </p>

        <h3>APT – Debian / Ubuntu:</h3>

        <pre><code>$ sudo apt update              # update package list
$ sudo apt upgrade             # upgrade installed packages
$ sudo apt install package     # install a package
$ sudo apt remove package      # remove a package
$ sudo apt purge package       # remove with config files
$ sudo apt autoremove          # clean unused packages
$ apt search package           # search for a package
$ apt show package             # package information</code></pre>

        <h3>DNF / YUM – CentOS / Fedora:</h3>

        <pre><code>$ sudo dnf update
$ sudo dnf install package
$ sudo dnf remove package
$ dnf search package
$ dnf list installed</code></pre>

        <h3>Installing Packages Manually:</h3>

        <pre><code>$ sudo dpkg -i package.deb     # Debian/Ubuntu .deb file
$ sudo rpm -i package.rpm      # RedHat/CentOS .rpm file

# From source code
$ ./configure
$ make
$ sudo make install</code></pre>

        <h3>Snap and Flatpak:</h3>

        <pre><code>$ sudo snap install package
$ flatpak install package
$ snap list
$ flatpak list</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Processes and Resource Management ──</h3>

        <p>
            Every running program in Linux is called a process. The system provides powerful tools
            to monitor and manage these processes and control system resources.
        </p>

        <h3>Viewing Running Processes:</h3>

        <pre><code>$ ps aux              # snapshot of all processes
$ top                 # dynamic process viewer
$ htop                # enhanced interactive viewer
$ ps aux | grep user  # filter by username
$ pstree              # process tree view</code></pre>

        <h3>Understanding ps aux Output:</h3>

        <pre><code>USER  PID  %CPU  %MEM  VSZ   RSS  STAT  COMMAND
root    1   0.0   0.1  168   11m  Ss    /sbin/init

PID  = Process ID
%CPU = CPU usage percentage
%MEM = Memory usage percentage
STAT = Process state (S=sleeping, R=running, Z=zombie)</code></pre>

        <h3>Killing Processes:</h3>

        <pre><code>$ kill 1234           # graceful stop by PID
$ kill -9 1234        # force kill
$ killall firefox     # kill by name
$ pkill -f "name"     # kill by pattern</code></pre>

        <h3>Managing Priority (Nice):</h3>

        <pre><code>$ nice -n 10 command        # run with low priority
$ renice -n 5 -p 1234       # change priority of running process
# Values: -20 (highest) to +19 (lowest)</code></pre>

        <h3>Monitoring System Resources:</h3>

        <pre><code>$ free -h              # memory information
$ df -h                # disk space usage
$ iostat               # detailed disk monitoring
$ lscpu                # CPU information
$ cat /proc/cpuinfo    # raw CPU details</code></pre>

        <h3>Background Jobs:</h3>

        <pre><code>$ command &            # run in background
Ctrl + Z then $ bg     # send current job to background
$ fg                   # bring job to foreground
$ jobs                 # list background jobs</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Networking in Linux ──</h3>

        <p>
            Linux provides a comprehensive set of tools for managing and monitoring networks,
            making it the top choice for administrators and security testers.
        </p>

        <h3>Viewing Network Information:</h3>

        <pre><code>$ ip addr              # show network interfaces
$ ip a                 # shorthand
$ ifconfig             # legacy command
$ ip route             # routing table
$ ss -tuln             # active connections
$ netstat -tuln        # legacy connections view</code></pre>

        <h3>Testing Connectivity:</h3>

        <pre><code>$ ping google.com
$ ping -c 4 8.8.8.8
$ traceroute google.com
$ nslookup google.com
$ dig google.com
$ host google.com</code></pre>

        <h3>Configuring Network Interfaces:</h3>

        <pre><code>$ sudo ip link set eth0 up
$ sudo ip link set eth0 down
$ sudo ip addr add 192.168.1.100/24 dev eth0
$ sudo ip addr del 192.168.1.100/24 dev eth0
$ sudo dhclient eth0               # get IP via DHCP</code></pre>

        <h3>Port Scanning and Services:</h3>

        <pre><code>$ ss -tlnp                         # show open ports
$ nmap 192.168.1.1                 # basic port scan
$ nmap -sV 192.168.1.1             # with service detection
$ nmap -p 80,443 target            # scan specific ports</code></pre>

        <h3>Downloading Files:</h3>

        <pre><code>$ wget https://example.com/file.zip
$ wget -O newname.zip https://example.com/file.zip
$ curl -O https://example.com/file.zip
$ curl -X POST -d "data=value" https://api.example.com</code></pre>

        <h3>SSH – Secure Remote Access:</h3>

        <pre><code>$ ssh user@192.168.1.100
$ ssh -p 2222 user@server.com
$ scp file.txt user@server:/home/user/
$ scp user@server:/path/file.txt ./local/
$ ssh-keygen -t rsa -b 4096
$ ssh-copy-id user@server</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Text Processing and Advanced Commands ──</h3>

        <p>
            Linux provides exceptional tools for processing text and files — one of its most
            powerful features that sets it apart from other operating systems.
        </p>

        <h3>Reading and Displaying Files:</h3>

        <pre><code>$ cat file.txt
$ cat -n file.txt          # with line numbers
$ head file.txt            # first 10 lines
$ head -n 20 file.txt
$ tail file.txt            # last 10 lines
$ tail -f /var/log/syslog  # follow in real time
$ less file.txt            # paginated view</code></pre>

        <h3>Searching Inside Files – grep:</h3>

        <pre><code>$ grep "error" logfile.txt
$ grep -i "error" logfile.txt       # case-insensitive
$ grep -n "error" logfile.txt       # show line numbers
$ grep -r "password" /etc/          # recursive search
$ grep -v "error" logfile.txt       # lines NOT matching
$ grep -E "error|warning" logfile.txt  # regex</code></pre>

        <h3>Pipes – Chaining Commands:</h3>

        <pre><code>$ cat file.txt | grep "error"
$ ps aux | grep firefox
$ cat access.log | grep "404" | wc -l</code></pre>

        <h3>Text Manipulation – awk and sed:</h3>

        <pre><code># sed – find and replace
$ sed 's/old/new/g' file.txt
$ sed -i 's/old/new/g' file.txt    # edit file in-place
$ sed '5d' file.txt                # delete line 5

# awk – column processing
$ awk '{print $1}' file.txt              # print first column
$ awk -F: '{print $1}' /etc/passwd       # colon separator
$ awk '{sum += $1} END {print sum}'      # sum a column</code></pre>

        <h3>Sorting and Deduplication:</h3>

        <pre><code>$ sort file.txt
$ sort -r file.txt          # reverse order
$ sort -n file.txt          # numeric sort
$ sort file.txt | uniq      # remove duplicates
$ sort file.txt | uniq -c | sort -rn   # count occurrences</code></pre>

        <h3>Redirection:</h3>

        <pre><code>$ command > output.txt          # overwrite to file
$ command >> output.txt         # append to file
$ command 2> errors.txt         # redirect errors
$ command > output.txt 2>&1     # both stdout and stderr
$ command > /dev/null 2>&1      # discard all output</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Bash Scripting ──</h3>

        <p>
            <b>Bash Scripting</b> is the art of writing command scripts to automate repetitive tasks
            in Linux, enabling you to build powerful tools that run automatically without manual
            intervention.
        </p>

        <h3>Your First Script:</h3>

        <pre><code>#!/bin/bash
# The first line (Shebang) defines the interpreter

echo "Welcome to Linux!"
echo "Current date: $(date)"
echo "Logged-in user: $USER"</code></pre>

        <pre><code>$ chmod +x script.sh    # make it executable
$ ./script.sh           # run it</code></pre>

        <h3>Variables:</h3>

        <pre><code>#!/bin/bash

NAME="Linux"
VERSION=22

echo "System: $NAME"
echo "Version: ${VERSION}"

# Built-in variables
echo "User: $USER"
echo "Current dir: $PWD"
echo "Last exit code: $?"    # 0 = success</code></pre>

        <h3>User Input:</h3>

        <pre><code>#!/bin/bash

read -p "Enter your name: " USERNAME
echo "Hello, $USERNAME"

read -sp "Enter password: " PASSWORD
echo
echo "Password received."</code></pre>

        <h3>Conditionals (If/Else):</h3>

        <pre><code>#!/bin/bash

AGE=18

if [ $AGE -ge 18 ]; then
    echo "You are an adult"
elif [ $AGE -ge 13 ]; then
    echo "You are a teenager"
else
    echo "You are a child"
fi

# Numeric comparison operators:
# -eq  equal to
# -ne  not equal to
# -gt  greater than
# -lt  less than
# -ge  greater than or equal
# -le  less than or equal</code></pre>

        <h3>Loops:</h3>

        <pre><code>#!/bin/bash

for i in 1 2 3 4 5; do
    echo "Number: $i"
done

for i in {1..10}; do
    echo "Count: $i"
done

COUNT=0
while [ $COUNT -lt 5 ]; do
    echo "Counter: $COUNT"
    COUNT=$((COUNT + 1))
done</code></pre>

        <h3>Functions:</h3>

        <pre><code>#!/bin/bash

check_service() {
    SERVICE=$1
    if systemctl is-active --quiet $SERVICE; then
        echo "$SERVICE: running ✓"
    else
        echo "$SERVICE: stopped ✗"
    fi
}

check_service "apache2"
check_service "nginx"
check_service "ssh"</code></pre>

        <h3>Practical Example – Backup Script:</h3>

        <pre><code>#!/bin/bash

BACKUP_DIR="/backup"
SOURCE_DIR="/home/user/Documents"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.tar.gz"

echo "Starting backup..."

if tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"; then
    echo "Backup successful: $BACKUP_FILE"
else
    echo "Backup failed!"
    exit 1
fi</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Services and Systemd ──</h3>

        <p>
            <b>Systemd</b> is the modern Linux initialization system responsible for managing
            services and processes at boot time and during operation.
        </p>

        <h3>Basic Service Management:</h3>

        <pre><code>$ sudo systemctl start service_name
$ sudo systemctl stop service_name
$ sudo systemctl restart service_name
$ sudo systemctl reload service_name
$ sudo systemctl status service_name</code></pre>

        <h3>Enable/Disable at Boot:</h3>

        <pre><code>$ sudo systemctl enable service_name
$ sudo systemctl disable service_name
$ sudo systemctl enable --now service_name</code></pre>

        <h3>Listing Services:</h3>

        <pre><code>$ systemctl list-units --type=service
$ systemctl list-units --failed
$ systemctl list-unit-files --state=enabled</code></pre>

        <h3>Reading System Logs – Journald:</h3>

        <pre><code>$ journalctl                              # all logs
$ journalctl -u nginx                     # service logs
$ journalctl -b                           # current boot logs
$ journalctl -f                           # follow live
$ journalctl --since "1 hour ago"
$ journalctl --since "2024-01-01" --until "2024-01-02"</code></pre>

        <h3>Creating a Custom Service:</h3>

        <pre><code># /etc/systemd/system/myapp.service

[Unit]
Description=My Custom Application
After=network.target

[Service]
Type=simple
User=myuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/start.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target</code></pre>

        <pre><code>$ sudo systemctl daemon-reload
$ sudo systemctl enable --now myapp</code></pre>

        <h3>System Power Management:</h3>

        <pre><code>$ sudo systemctl reboot
$ sudo systemctl poweroff
$ sudo shutdown -h now
$ sudo shutdown -h +10     # shutdown in 10 minutes</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── Firewall Management ──</h3>

        <p>
            The Linux firewall is the first line of defense against intrusion, controlling inbound
            and outbound network traffic based on defined rules.
        </p>

        <h3>UFW – Uncomplicated Firewall (Ubuntu):</h3>

        <pre><code>$ sudo ufw enable
$ sudo ufw disable
$ sudo ufw status
$ sudo ufw status verbose
$ sudo ufw status numbered</code></pre>

        <h3>Adding UFW Rules:</h3>

        <pre><code>$ sudo ufw allow 22
$ sudo ufw allow ssh
$ sudo ufw allow 80
$ sudo ufw allow 443
$ sudo ufw allow 'Nginx Full'
$ sudo ufw deny 23                               # block Telnet
$ sudo ufw allow from 192.168.1.100
$ sudo ufw allow from 192.168.1.0/24
$ sudo ufw allow from 10.0.0.5 to any port 22</code></pre>

        <h3>Deleting Rules:</h3>

        <pre><code>$ sudo ufw delete 3           # delete by number
$ sudo ufw delete allow 80    # delete by rule
$ sudo ufw reset              # reset all rules</code></pre>

        <h3>iptables – Advanced Firewall:</h3>

        <pre><code>$ sudo iptables -L -n -v

$ sudo iptables -A INPUT -i lo -j ACCEPT
$ sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
$ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
$ sudo iptables -A INPUT -j DROP
$ sudo iptables -D INPUT -p tcp --dport 22 -j ACCEPT</code></pre>

        <h3>Saving iptables Rules:</h3>

        <pre><code>$ sudo iptables-save > /etc/iptables/rules.v4
$ sudo iptables-restore < /etc/iptables/rules.v4
$ sudo apt install iptables-persistent</code></pre>

        <h3>Secure Firewall Setup Script:</h3>

        <pre><code>#!/bin/bash

iptables -F
iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

echo "Firewall configured successfully"</code></pre>

        <!-- ═══════════════════════════════════════════════ -->
        <h3>── System Monitoring and Log Analysis ──</h3>

        <p>
            System monitoring and log analysis are among the most critical skills for system
            administrators and security testers, enabling early detection of issues and attacks.
        </p>

        <h3>System Monitoring Tools:</h3>

        <pre><code>$ htop                 # interactive process viewer
$ glances              # comprehensive overview
$ free -h              # memory usage
$ vmstat 1             # virtual memory stats (every 1s)
$ mpstat 1             # CPU stats
$ iostat -x 1          # disk I/O stats
$ iotop                # per-process disk usage</code></pre>

        <h3>Important Log Files:</h3>

        <pre><code>/var/log/syslog        # main system log (Ubuntu)
/var/log/messages      # main system log (CentOS)
/var/log/auth.log      # authentication and login log
/var/log/kern.log      # kernel log
/var/log/dmesg         # boot messages
/var/log/apache2/      # Apache web server logs
/var/log/nginx/        # Nginx web server logs
/var/log/mysql/        # MySQL database logs
/var/log/fail2ban.log  # brute-force protection log</code></pre>

        <h3>Analyzing Authentication Logs:</h3>

        <pre><code>$ grep "Failed password" /var/log/auth.log
$ grep "Accepted password" /var/log/auth.log

# Top IPs attempting brute-force
$ grep "Failed password" /var/log/auth.log | \
  awk '{print $11}' | sort | uniq -c | sort -rn | head -20

$ who
$ last
$ lastlog</code></pre>

        <h3>Real-Time Log Monitoring:</h3>

        <pre><code>$ tail -f /var/log/syslog
$ tail -f /var/log/auth.log | grep "Failed"
$ tail -f /var/log/syslog /var/log/auth.log</code></pre>

        <h3>Fail2ban – Brute-Force Protection:</h3>

        <pre><code>$ sudo apt install fail2ban
$ sudo fail2ban-client status sshd
$ sudo fail2ban-client set sshd banip 192.168.1.100
$ sudo fail2ban-client set sshd unbanip 192.168.1.100</code></pre>

        <h3>Signs of a Possible Compromise:</h3>

        <pre><code>Repeated failed login attempts
Logins from unusual IP addresses
Changes to system files
Unknown processes running in the background
Abnormal spike in network traffic
New files appearing in /tmp or /var/tmp</code></pre>

        <h3>Important Notes:</h3>

        <p>
            Always keep an external copy of your logs (e.g., a centralized Syslog server), because
            an attacker may delete local logs to cover their tracks.
        </p>

        <p>
            Regularly review <code>/var/log/auth.log</code> — it is the first place to check when
            a breach is suspected.
        </p>

        <p>
            Use <code>UFW</code> for simplicity and <code>iptables</code> for fine-grained control.
            Always confirm port <code>22</code> is allowed before enabling the firewall on a remote
            server, or you will lose SSH access.
        </p>

        <p>
            Linux is case-sensitive: <code>File.txt</code> and <code>file.txt</code> are two
            completely different files. Everything in Linux is treated as a file — including
            devices, processes, and network sockets.
        </p>
    `
}
);
