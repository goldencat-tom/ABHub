import { Request, Response } from 'express'
import Server, {
  getAllServers,
  findUnique,
  createServer,
  updateServerById,
  deleteServerById,
} from 'models/servers'

export async function getServers(req: Request, res: Response) {
  const servers = await getAllServers()
  return res.json({
    servers,
  })
}

export async function storeServer(req: Request, res: Response) {
  const server = await createServer({
    address: String(req.body.address),
    name: String(req.body.name),
    desc: String(req.body.desc),
    productId: Number(req.body.productId),
  })
  if (!server || server instanceof Error) {
    return res.status(500).json({
      success: false,
      message: server?.message,
    })
  }

  return res.json({
    success: true,
    server: server,
  })
}

export async function updateServer(req: Request, res: Response) {
  const serverId = Number(req.body.id)
  const updated = await updateServerById(serverId, {
    address: String(req.body.address),
    name: String(req.body.name),
    desc: String(req.body.desc),
    state: Number(req.body.state),
  })
  if (!updated || updated instanceof Error) {
    return res.status(500).json({
      success: false,
      message: updated?.message,
    })
  }

  return res.json({
    success: true,
  })
}

export async function deleteServer(req: Request, res: Response) {
  const { id } = req.params
  if (!id) {
    return res.status(422).json({
      success: false,
      message: 'invalid_record',
    })
  }

  const deleted = await deleteServerById(Number(id))
  if (!deleted || deleted instanceof Error) {
    return res.status(500).json({
      success: false,
      message: deleted?.message,
    })
  }

  return res.json({
    success: true,
  })
}
