import { Client } from '@notionhq/client'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const parseDatabaseId = (databaseUrl: string) => {
    
    if (databaseUrl === undefined) {
        throw new Error('Please provide a database url')
    }
    const DATABASE_ID = databaseUrl.split("/").pop()?.split("?v=")[0]
    if (DATABASE_ID === undefined) {
        throw new Error('Please provide a database id')
    }
    return DATABASE_ID

}

export async function createImagePage(photoName: string, src: string, aspectRatio: string, databaseUrl: string) {
    const database_id = parseDatabaseId(databaseUrl)
    return await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id
        },
        properties: {
            name: {
                "type": "title",
                "title": [{ "type": "text", "text": { "content": photoName } }]
            },
            src: {
                'type': 'url',
                url: src
            },
            aspectRatio: {
                'type': 'select',
                select: {
                    name: aspectRatio
                }
            }
        }
    })
}
