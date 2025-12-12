import sql from '../config/database.js';

class ProjectService {
  async createProject(titulo, descricao, orcamento, empresa_id) {
    const [project] = await sql`
      INSERT INTO projects (titulo, descricao, orcamento, empresa_id)
      VALUES (${titulo}, ${descricao}, ${orcamento}, ${empresa_id})
      RETURNING id, titulo, descricao, orcamento, empresa_id, status, criado_em
    `;
    return project;
  }

  async getProjects() {
    const projects = await sql`
      SELECT id, titulo, descricao, orcamento, empresa_id, status, criado_em, atualizado_em FROM projects
    `;
    return projects;
  }

  async getProjectById(projectId) {
    const [project] = await sql`
      SELECT id, titulo, descricao, orcamento, empresa_id, status, criado_em, atualizado_em FROM projects WHERE id = ${projectId}
    `;
    return project;
  }

  async getProjectsByEmpresaId(empresaId) {
    const projects = await sql`
      SELECT id, titulo, descricao, orcamento, empresa_id, status, criado_em, atualizado_em
      FROM projects
      WHERE empresa_id = ${empresaId}
      ORDER BY criado_em DESC
    `;
    return projects;
  }

  async updateProject(projectId, titulo, descricao, status, empresa_id) {
    const [project] = await sql`
      UPDATE projects
      SET
        titulo = COALESCE(${titulo ?? null}, titulo),
        descricao = COALESCE(${descricao ?? null}, descricao),
        status = COALESCE(${status ?? null}, status)
      WHERE id = ${projectId} AND empresa_id = ${empresa_id}
      RETURNING id, titulo, descricao, empresa_id, status, criado_em, atualizado_em
    `;
    return project;
  }

  async finishProject(projectId, empresa_id) {
    const [project] = await sql`SELECT id FROM projects WHERE id = ${projectId} AND empresa_id = ${empresa_id}`;
    if (!project) {
      throw new Error('Projeto não encontrado ou você não tem permissão para finalizá-lo.');
    }

    await sql.begin(async sql => {
      await sql`UPDATE projects SET status = 'finalizado' WHERE id = ${projectId}`;
      await sql`UPDATE contracts SET status = 'finalizado' WHERE project_id = ${projectId}`;
    });

    return { id: projectId, status: 'finalizado' };
  }

  async deleteProject(projectId, empresa_id) {
    const [deletedProject] = await sql`
      DELETE FROM projects WHERE id = ${projectId} AND empresa_id = ${empresa_id}
      RETURNING id
    `;
    return deletedProject;
  }
}

export default new ProjectService();