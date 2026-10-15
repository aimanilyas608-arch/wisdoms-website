import { config } from 'dotenv'
config({ path: '.env.local' })
import net from 'node:net'
import { URL } from 'node:url'

const uri = process.env.DATABASE_URI
if (!uri) { console.error('DATABASE_URI missing'); process.exit(1) }

console.log('═══ DATABASE_URI (password masked) ═══')
console.log(uri.replace(/:[^:@]*@/, ':XXX@'))

console.log('\n═══ All PG* vars in process.env ═══')
const pgVars = Object.keys(process.env).filter(k => /^PG/i.test(k))
if (pgVars.length === 0) console.log('(none)')
pgVars.forEach(k => console.log(`  ${k}=${k.includes('PASS') ? '***' : process.env[k]}`))

const u = new URL(uri.replace('postgresql://', 'http://'))
const host = u.hostname
const port = Number(u.port) || 5432
console.log('\n═══ Parsed URI ═══')
console.log('  Host:', host)
console.log('  Port:', port)
console.log('  User:', u.username)
console.log('  DB path:', u.pathname)
console.log('  Query:', u.search)

console.log('\n═══ Raw SSL handshake test ═══')
const socket = net.createConnection({ host, port })
socket.setTimeout(15000)

socket.on('connect', () => {
  console.log('  TCP connected to', host + ':' + port)
  // PostgreSQL SSLRequest packet
  socket.write(Buffer.from([0, 0, 0, 8, 4, 210, 22, 47]))
})

socket.on('data', (data) => {
  const byte = data[0]
  const char = String.fromCharCode(byte)
  console.log('  Response byte:', byte, '=', JSON.stringify(char))
  if (byte === 0x53) console.log('  ✅ Server supports SSL (S)')
  else if (byte === 0x4E) console.log('  ❌ Server REFUSED SSL (N) — same error pg sees')
  else console.log('  ⚠️ Unexpected byte — server is not PostgreSQL or is a proxy')
  socket.end()
})

socket.on('error', (err) => { console.error('  Socket error:', err.message); process.exit(1) })
socket.on('timeout', () => { console.error('  Timeout'); socket.destroy(); process.exit(1) })
