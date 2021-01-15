import {Controller} from "./controller";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {DatabaseManager} from "../data/database-manager";
import {InfoService} from "../services/info-service";

// TODO Implement server info controller
/**
 * This controller maps and provides for all the controllers under /info.
 */
export class InfoController extends Controller {
  private infoService: InfoService;

  constructor(fastify: FastifyInstance, databaseManager: DatabaseManager) {
    super(fastify, databaseManager);

    this.infoService = new InfoService(databaseManager);
  }

  registerRoutes(): void {
    // Unauthenticated
    this.fastify.all('/info/version', this.GetVersion.bind(this));
  }

  /**
   * Route for /info/version
   *
   * Used to get the server's version.
   *
   * @param request
   * @param reply
   * @constructor
   */
  async GetVersion(request: FastifyRequest, reply: FastifyReply) {
    let data = this.infoService.getVersion();

    return {
      version: data
    };
  }
}