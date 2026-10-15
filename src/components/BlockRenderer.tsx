import { blockRegistry } from '@/blocks/registry'

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockRegistry[block.blockType]
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            return (
              <div key={i} className="p-4 bg-red-50 text-red-700 text-sm">
                Unknown block: <code>{block.blockType}</code>
              </div>
            )
          }
          return null
        }
        return <Component key={block.id ?? i} {...block} />
      })}
    </>
  )
}