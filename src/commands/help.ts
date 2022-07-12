import { Command } from "clipanion";

/**
 * A command that prints the usage of all commands.
 *
 * Paths: `-h`, `--help`
 */
export class HelpCommand extends Command {
  static paths = [[`-h`], [`--help`]];
  async execute() {
    this.context.stdout.write(this.cli.usage());
  }
}