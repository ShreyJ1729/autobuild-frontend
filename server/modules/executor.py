import subprocess

class Executor:

    
    def execute(self, command):
        """
        Executes a command and returns the output and error
        @param command: The command to execute
        """
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        
        return output, error

    def __init__(self):
        print("Initialized")