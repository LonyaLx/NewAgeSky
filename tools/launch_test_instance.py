from pathlib import Path
import json, os, subprocess, sys

INSTANCE = Path(r"D:\我的世界整合包\1\versions\测试")
LIBS = Path(r"D:\我的世界整合包\1\libraries")
ASSETS = Path(r"D:\我的世界整合包\1\assets")
JAVA = Path(r"E:\java\java21\java21.0.9\bin\java.exe")
VERSION_JSON = INSTANCE / "测试.json"
CLIENT_JAR = INSTANCE / "测试.jar"
NATIVES = INSTANCE / "测试-natives"
LOG = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1\tools\test_launch_stdout.log")
ERR = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1\tools\test_launch_stderr.log")

data = json.loads(VERSION_JSON.read_text(encoding="utf-8"))


def rule_allows(rule: dict) -> bool:
    if rule.get("action") != "allow":
        return False
    os_rule = rule.get("os", {})
    if "name" in os_rule and os_rule["name"] != "windows":
        return False
    if "arch" in os_rule and os_rule["arch"] != "x86_64":
        return False
    features = rule.get("features", {})
    if features and any(not bool(v) for v in features.values()):
        return False
    return True


def selected(value):
    if isinstance(value, str):
        return True
    if isinstance(value, list):
        return True
    rules = value.get("rules", [])
    if not rules:
        return True
    return any(rule_allows(r) for r in rules)


entries = []
for lib in data.get("libraries", []):
    if not selected(lib):
        continue
    artifact = lib.get("downloads", {}).get("artifact")
    if not artifact or not artifact.get("path"):
        continue
    candidate = LIBS / artifact["path"]
    if candidate.exists():
        entries.append(str(candidate))

entries.append(str(CLIENT_JAR))
entries = list(dict.fromkeys(entries))
classpath = ";".join(entries)
module_path = ";".join(str(LIBS / p) for p in [
    "cpw/mods/bootstraplauncher/2.0.2/bootstraplauncher-2.0.2.jar",
    "cpw/mods/securejarhandler/3.0.8/securejarhandler-3.0.8.jar",
    "org/ow2/asm/asm-commons/9.10.1/asm-commons-9.10.1.jar",
    "org/ow2/asm/asm-util/9.10.1/asm-util-9.10.1.jar",
    "org/ow2/asm/asm-analysis/9.10.1/asm-analysis-9.10.1.jar",
    "org/ow2/asm/asm-tree/9.10.1/asm-tree-9.10.1.jar",
    "org/ow2/asm/asm/9.10.1/asm-9.10.1.jar",
    "net/neoforged/JarJarFileSystems/0.4.1/JarJarFileSystems-0.4.1.jar",
])

base = {
    "natives_directory": str(NATIVES),
    "classpath": classpath,
    "library_directory": str(LIBS),
    "classpath_separator": ";",
    "launcher_name": "PCL",
    "launcher_version": "2",
}

cmd = [
    str(JAVA), "-Xms2G", "-Xmx6G", "-Duser.language=zh", "-Duser.country=CN",
    "-Djava.library.path=" + str(NATIVES),
    "-Djna.tmpdir=" + str(NATIVES),
    "-Dorg.lwjgl.system.SharedLibraryExtractPath=" + str(NATIVES),
    "-Dio.netty.native.workdir=" + str(NATIVES),
    "-Dminecraft.launcher.brand=PCL",
    "-Dminecraft.launcher.version=2",
    "-Djava.net.preferIPv6Addresses=system",
    "-DignoreList=client-extra,测试.jar",
    "-DlibraryDirectory=" + str(LIBS),
    "-cp", classpath,
    "-p", module_path,
    "--add-modules", "ALL-MODULE-PATH",
    "--add-opens", "java.base/java.util.jar=cpw.mods.securejarhandler",
    "--add-opens", "java.base/java.lang.invoke=cpw.mods.securejarhandler",
    "--add-exports", "java.base/sun.security.util=cpw.mods.securejarhandler",
    "--add-exports", "jdk.naming.dns/com.sun.jndi.dns=java.naming",
    "cpw.mods.bootstraplauncher.BootstrapLauncher",
    "--username", "LonyaLx",
    "--version", data.get("id", "测试"),
    "--gameDir", str(INSTANCE),
    "--assetsDir", str(ASSETS),
    "--assetIndex", str(data.get("assetIndex", {}).get("id", "17")),
    "--uuid", "6b6804c716da4423ac24aeb3023012e4",
    "--accessToken", "offline",
    "--clientId", "newagesky-test",
    "--xuid", "0",
    "--userType", "msa",
    "--versionType", "PCL",
    "--width", "854",
    "--height", "480",
    "--fml.neoForgeVersion", "21.1.250",
    "--fml.fmlVersion", "4.0.44",
    "--fml.mcVersion", "1.21.1",
    "--fml.neoFormVersion", "20240808.144430",
    "--launchTarget", "forgeclient",
    "--quickPlaySingleplayer", "新的世界",
]

LOG.parent.mkdir(parents=True, exist_ok=True)
with LOG.open("w", encoding="utf-8") as out, ERR.open("w", encoding="utf-8") as err:
    proc = subprocess.Popen(cmd, cwd=str(INSTANCE), stdout=out, stderr=err, creationflags=subprocess.CREATE_NO_WINDOW)
print(proc.pid)