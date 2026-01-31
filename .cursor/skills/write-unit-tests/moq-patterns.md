# Common Moq Patterns

## Basic Setup

```csharp
// Simple return value
mock.Setup(x => x.GetValue()).Returns(42);

// Return based on input
mock.Setup(x => x.GetById(It.IsAny<int>()))
    .Returns<int>(id => new Entity { Id = id });

// Async return
mock.Setup(x => x.GetAsync(1)).ReturnsAsync(entity);

// Sequence of returns
mock.SetupSequence(x => x.GetNext())
    .Returns(1)
    .Returns(2)
    .Throws<InvalidOperationException>();
```

## Argument Matching

```csharp
// Any value
It.IsAny<string>()

// Specific condition
It.Is<int>(x => x > 0)

// Regex match
It.IsRegex("[a-z]+")

// In range
It.IsInRange(1, 10, Range.Inclusive)
```

## Throwing Exceptions

```csharp
// Always throw
mock.Setup(x => x.Save(null))
    .Throws<ArgumentNullException>();

// Throw with message
mock.Setup(x => x.Delete(It.Is<int>(id => id < 0)))
    .Throws(new ArgumentException("ID cannot be negative"));

// Async throw
mock.Setup(x => x.SaveAsync(null))
    .ThrowsAsync(new ValidationException());
```

## Callbacks

```csharp
// Capture argument
Entity captured = null;
mock.Setup(x => x.Save(It.IsAny<Entity>()))
    .Callback<Entity>(e => captured = e);

// Multiple arguments
mock.Setup(x => x.Process(It.IsAny<string>(), It.IsAny<int>()))
    .Callback<string, int>((s, i) => Console.WriteLine($"{s}: {i}"));

// Before and after
mock.Setup(x => x.Calculate())
    .Callback(() => Console.WriteLine("Before"))
    .Returns(42)
    .Callback(() => Console.WriteLine("After"));
```

## Verification

```csharp
// Called once
mock.Verify(x => x.Save(It.IsAny<Entity>()), Times.Once);

// Called specific times
mock.Verify(x => x.Log(It.IsAny<string>()), Times.Exactly(3));

// Never called
mock.Verify(x => x.Delete(It.IsAny<int>()), Times.Never);

// Called with specific argument
mock.Verify(x => x.Save(It.Is<Entity>(e => e.Id == 1)));

// Verify all setups were called
mock.VerifyAll();

// Verify no other calls
mock.VerifyNoOtherCalls();
```

## Properties

```csharp
// Simple property
mock.Setup(x => x.Name).Returns("Test");

// Settable property
mock.SetupProperty(x => x.Count, 0);

// All properties
mock.SetupAllProperties();
```

## Protected Members

```csharp
mock.Protected()
    .Setup<int>("ProtectedMethod", ItExpr.IsAny<string>())
    .Returns(42);
```

## Mock Behavior

```csharp
// Strict - throws on unexpected calls
var strictMock = new Mock<IService>(MockBehavior.Strict);

// Loose (default) - returns default values
var looseMock = new Mock<IService>(MockBehavior.Loose);
```

## Common Test Fixtures

```csharp
public class ServiceTestFixture : IDisposable
{
    public Mock<IRepository> MockRepo { get; }
    public Mock<ILogger> MockLogger { get; }
    public MyService Sut { get; }

    public ServiceTestFixture()
    {
        MockRepo = new Mock<IRepository>();
        MockLogger = new Mock<ILogger>();
        Sut = new MyService(MockRepo.Object, MockLogger.Object);
    }

    public void Dispose()
    {
        // Cleanup if needed
    }
}

public class MyServiceTests : IClassFixture<ServiceTestFixture>
{
    private readonly ServiceTestFixture _fixture;

    public MyServiceTests(ServiceTestFixture fixture)
    {
        _fixture = fixture;
    }
}
```
