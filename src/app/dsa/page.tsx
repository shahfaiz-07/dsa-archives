import {FolderList} from '../components/FolderList'

export default function DSAHome() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 font-mono">📚 DSA Archives</h1>
      <FolderList path='' />
    </main>
  )
}
