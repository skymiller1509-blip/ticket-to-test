#!/usr/bin/env bash
# Kane runner wrapper.
# Full Google Chrome is installed at /usr/bin/google-chrome (2026-11-13),
# so no override is needed: Kane finds Chrome itself.
#
# NO_PROXY fix (2026-11-13): this VM's NO_PROXY/no_proxy contain bracketed
# IPv6 entries like [::1]. httpx (inside Kane's runner) cannot parse those
# and crashes every run with "Invalid port: ':1]'" before any step runs.
# Strip every [...] entry before launching Kane; the unbracketed entries
# (localhost, 127.0.0.1, ::1, ...) stay and still bypass the proxy.
clean_no_proxy() { printf '%s' "$1" | sed -E 's/,\[[^]]*\]//g; s/^\[[^]]*\],?//g; s/,,+/,/g; s/^,//; s/,$//'; }
export NO_PROXY="$(clean_no_proxy "${NO_PROXY:-}")"
export no_proxy="$(clean_no_proxy "${no_proxy:-}")"
exec kane-cli "$@"
