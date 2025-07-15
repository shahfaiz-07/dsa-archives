import {FolderList} from '../components/FolderList'

export default function DSAHome() {
  return (
    <main className="p-3 md:p-6">
      <h1 className="text-2xl font-bold mb-4 font-mono">📚 DSA Archives</h1>
      <div className='border px-2 border-gray-600 rounded-lg'>
        <FolderList path=''/>
      </div>
    </main>
  )
}
