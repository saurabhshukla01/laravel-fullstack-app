<h1>{{ $post->title }}</h1>
<p>{{ $post->content }}</p>

<h3>Comments:</h3>
@foreach($post->comments as $comment)
    <p><strong>{{ $comment->user->name }}</strong>: {{ $comment->comment }}</p>
@endforeach
