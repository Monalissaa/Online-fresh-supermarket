
from SE import app

if __name__ == '__main__':

    '''
    import os
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555
    
    print(PORT)
    app.run(HOST, PORT)
    '''

    app.run()
