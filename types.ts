export type ApiPasteFormat =
  | "4cs"
  | "6502acme"
  | "6502kickass"
  | "6502tasm"
  | "abap"
  | "actionscript"
  | "actionscript3"
  | "ada"
  | "aimms"
  | "algol68"
  | "apache"
  | "applescript"
  | "apt_sources"
  | "arduino"
  | "arm"
  | "asm"
  | "asp"
  | "asymptote"
  | "autoconf"
  | "autohotkey"
  | "autoit"
  | "avisynth"
  | "awk"
  | "bascomavr"
  | "bash"
  | "basic4gl"
  | "dos"
  | "bibtex"
  | "b3d"
  | "blitzbasic"
  | "bmx"
  | "bnf"
  | "boo"
  | "bf"
  | "c"
  | "csharp"
  | "c_winapi"
  | "cpp"
  | "cpp-winapi"
  | "cpp-qt"
  | "c_loadrunner"
  | "caddcl"
  | "cadlisp"
  | "ceylon"
  | "cfdg"
  | "c_mac"
  | "chaiscript"
  | "chapel"
  | "cil"
  | "clojure"
  | "klonec"
  | "klonecpp"
  | "cmake"
  | "cobol"
  | "coffeescript"
  | "cfm"
  | "css"
  | "cuesheet"
  | "d"
  | "dart"
  | "dcl"
  | "dcpu16"
  | "dcs"
  | "delphi"
  | "oxygene"
  | "diff"
  | "div"
  | "dot"
  | "e"
  | "ezt"
  | "ecmascript"
  | "eiffel"
  | "email"
  | "epc"
  | "erlang"
  | "euphoria"
  | "fsharp"
  | "falcon"
  | "filemaker"
  | "fo"
  | "f1"
  | "fortran"
  | "freebasic"
  | "freeswitch"
  | "gambas"
  | "gml"
  | "gdb"
  | "gdscript"
  | "genero"
  | "genie"
  | "gettext"
  | "go"
  | "godot-lsl"
  | "groovy"
  | "gwbasic"
  | "haskell"
  | "haxe"
  | "hicest"
  | "hq9plus"
  | "html4strict"
  | "html5"
  | "icon"
  | "idl"
  | "ini"
  | "inno"
  | "intercal"
  | "io"
  | "ispfpanel"
  | "j"
  | "java"
  | "java5"
  | "javascript"
  | "jcl"
  | "jquery"
  | "json"
  | "julia"
  | "kixtart"
  | "kotlin"
  | "ksp"
  | "latex"
  | "ldif"
  | "lb"
  | "lsl2"
  | "lisp"
  | "llvm"
  | "locobasic"
  | "logtalk"
  | "lolcode"
  | "lotusformulas"
  | "lotusscript"
  | "lscript"
  | "lua"
  | "m68k"
  | "magiksf"
  | "make"
  | "mapbasic"
  | "markdown"
  | "matlab"
  | "mercury"
  | "metapost"
  | "mirc"
  | "mmix"
  | "mk-61"
  | "modula2"
  | "modula3"
  | "68000devpac"
  | "mpasm"
  | "mxml"
  | "mysql"
  | "nagios"
  | "netrexx"
  | "newlisp"
  | "nginx"
  | "nim"
  | "nsis"
  | "oberon2"
  | "objeck"
  | "objc"
  | "ocaml"
  | "ocaml-brief"
  | "octave"
  | "pf"
  | "glsl"
  | "oorexx"
  | "oobas"
  | "oracle8"
  | "oracle11"
  | "oz"
  | "parasail"
  | "parigp"
  | "pascal"
  | "pawn"
  | "pcre"
  | "per"
  | "perl"
  | "perl6"
  | "phix"
  | "php"
  | "php-brief"
  | "pic16"
  | "pike"
  | "pixelbender"
  | "pli"
  | "plsql"
  | "postgresql"
  | "postscript"
  | "povray"
  | "powerbuilder"
  | "powershell"
  | "proftpd"
  | "progress"
  | "prolog"
  | "properties"
  | "providex"
  | "puppet"
  | "purebasic"
  | "pycon"
  | "python"
  | "pys60"
  | "q"
  | "qbasic"
  | "qml"
  | "rsplus"
  | "racket"
  | "rails"
  | "rbs"
  | "rebol"
  | "reg"
  | "rexx"
  | "robots"
  | "roff"
  | "rpmspec"
  | "ruby"
  | "gnuplot"
  | "rust"
  | "sas"
  | "scala"
  | "scheme"
  | "scilab"
  | "scl"
  | "sdlbasic"
  | "smalltalk"
  | "smarty"
  | "spark"
  | "sparql"
  | "sqf"
  | "sql"
  | "sshconfig"
  | "standardml"
  | "stonescript"
  | "sclang"
  | "swift"
  | "systemverilog"
  | "tsql"
  | "tcl"
  | "teraterm"
  | "texgraph"
  | "thinbasic"
  | "typescript"
  | "typoscript"
  | "unicon"
  | "uscript"
  | "upc"
  | "urbi"
  | "vala"
  | "vbnet"
  | "vbscript"
  | "vedit"
  | "verilog"
  | "vhdl"
  | "vim"
  | "vb"
  | "visualfoxpro"
  | "visualprolog"
  | "whitespace"
  | "whois"
  | "winbatch"
  | "xbasic"
  | "xml"
  | "xojo"
  | "xorg_conf"
  | "xpp"
  | "yaml"
  | "yara"
  | "z80"
  | "zxbasic";

/**
 * 0 = public
 * 1 = unlisted
 * 2 = private
 */
export type Publicity = 0 | 1 | 2;

export type ExpireDate =
  | "N" // never
  | "10M" // 10 minutes
  | "1H" // 1 hour
  | "1D" // 1 day
  | "1W" // 1 week
  | "2W" // 2 weeks
  | "1M" // 1 month
  | "6M" // 6 months
  | "1Y"; // 1 year

export interface ClientOptions {
  /** the API key */
  devKey: string;
  /** the domain of your reverse proxy server */
  domain?: string;
}

export interface CreateOptions {
  userKey?: string;
  name?: string;
  code: string;
  publicity?: Publicity;
  format?: ApiPasteFormat;
  expireDate?: ExpireDate;
  folderKey?: string;
}

export interface GetPastesOptions {
  userKey: string;
  limit?: number;
}

export interface DeletePasteOptions {
  userKey: string;
  pasteKey: string;
}

export type GetRawPasteOptions = {
  userKey?: string;
  pasteKey: string;
};

export interface Paste {
  paste_key: string;
  paste_date: number;
  paste_title: string;
  paste_size: number;
  paste_expire_date: number;
  paste_private: Publicity;
  paste_format_long: string;
  paste_format_short: ApiPasteFormat;
  paste_url: string;
  paste_hits: number;
}

/** 0 = Normal, 1 = Pro */
export type AccountType = 0 | 1;

export interface User {
  user_name: string;
  user_format_short: ApiPasteFormat;
  user_expiration: ExpireDate;
  user_avatar_url: string;
  user_private: Publicity;
  user_website?: string;
  user_email: string;
  user_location?: string;
  user_account_type: AccountType;
}
