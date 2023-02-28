import subprocess

class Executor:

    @staticmethod
    def execute(command: str) -> tuple:
        """
        Executes a command and returns the output and error
        @param command: The command to execute
        @return output, error: The output and error of the command
        """
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        return output, error


if __name__ == "__main__":
    output, error = Executor.execute("ls")
    print(output)
    print(error)