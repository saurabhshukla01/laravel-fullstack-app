@foreach($posts as $post)
    <h2><a href="{{ url('/blog/'.$post->id) }}">{{ $post->title }}</a></h2>
    <p>By {{ $post->user->name }}</p>
@endforeach
