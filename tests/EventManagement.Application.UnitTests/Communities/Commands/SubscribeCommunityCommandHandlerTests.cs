using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Commands.SubscribeCommunity;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Domain.Entities.Form;
using EventManagement.Domain.Entities.Form.FormField;
using EventManagement.Domain.Entities.Form.Answer;
using MockQueryable.Moq;

namespace EventManagement.Application.UnitTests.Communities.Commands;

public class SubscribeCommunityCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _dbContextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;

    public SubscribeCommunityCommandHandlerTests()
    {
        _dbContextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();

        // Initialize DbSet properties
        var communities = new List<Community>().AsQueryable().BuildMockDbSet();
        var subscriptions = new List<Subscription>().AsQueryable().BuildMockDbSet();
        var formAnswers = new List<FormAnswer>().AsQueryable().BuildMockDbSet();

        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(communities.Object);
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions.Object);
        _dbContextMock.Setup(c => c.FormAnswers).ReturnsDbSet(formAnswers.Object);
    }

    [Fact]
    public async Task Handle_CommunityNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new SubscribeCommunityCommand(1);
        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_UserAlreadySubscribed_ThrowsValidationException()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var command = new SubscribeCommunityCommand(communityId);
        var community = new Community { Id = communityId };
        var subscription = new Subscription { UserId = userId, CommunityId = communityId };

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(new[] { community }.AsQueryable());
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(new[] { subscription }.AsQueryable());

        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_RequiredFormAnswerNotProvided_ThrowsValidationException()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var command = new SubscribeCommunityCommand(communityId);
        var formFields = new List<FormFieldBase> { new ShortTextFormField { Name = "Field1", IsRequired = true } };
        var form = new Form();
        form.Fields.AddRange(formFields);
        var subscriptionForm = new CommunitySubscriptionForm { Form = form };
        var community = new Community { Id = communityId, SubscriptionForm = subscriptionForm };

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(new[] { community }.AsQueryable());
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(new List<Subscription>().AsQueryable());

        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ValidFormAnswer_AddsSubscriptionAndFormAnswer()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var formAnswerDto = new FormAnswerDto([new("Field1", "Answer")]);
        var command = new SubscribeCommunityCommand(communityId, formAnswerDto);
        var formFields = new List<FormFieldBase> { new ShortTextFormField { Name = "Field1", IsRequired = true } };
        var form = new Form();
        form.Fields.AddRange(formFields);
        var subscriptionForm = new CommunitySubscriptionForm { Form = form };
        var community = new Community { Id = communityId, SubscriptionForm = subscriptionForm };
        var subscriptions = new List<Subscription>().AsQueryable();

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(new[] { community }.AsQueryable());
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        await handler.Handle(command, CancellationToken.None);

        // Assert
        _dbContextMock.Verify(c => c.Subscriptions.AddAsync(It.IsAny<Subscription>(), It.IsAny<CancellationToken>()), Times.Once);
        _dbContextMock.Verify(c => c.FormAnswers.AddAsync(It.IsAny<FormAnswer>(), It.IsAny<CancellationToken>()), Times.Once);
        _dbContextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_MultipleOptionsFieldValidatesCorrectly()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var formAnswerDto = new FormAnswerDto([new("Field1", new List<string> { "Option1" })]);
        var command = new SubscribeCommunityCommand(communityId, formAnswerDto);

        var formFields = new List<FormFieldBase>
        {
            new MultipleOptionsFormField
            {
                Name = "Field1",
                IsRequired = true,
                Options = ["Option1", "Option2"]
            }
        };
        var form = new Form();
        form.Fields.AddRange(formFields);
        var subscriptionForm = new CommunitySubscriptionForm { Form = form };
        var community = new Community { Id = communityId, SubscriptionForm = subscriptionForm };
        var subscriptions = new List<Subscription>().AsQueryable();

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(new[] { community }.AsQueryable());
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        await handler.Handle(command, CancellationToken.None);

        // Assert
        _dbContextMock.Verify(c => c.Subscriptions.AddAsync(It.IsAny<Subscription>(), It.IsAny<CancellationToken>()), Times.Once);
        _dbContextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_SingleOptionFieldValidatesCorrectly()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var formAnswerDto = new FormAnswerDto([new("Field1", "Option1")]);
        var command = new SubscribeCommunityCommand(communityId, formAnswerDto);

        var formFields = new List<FormFieldBase>
        {
            new SingleOptionFormField
            {
                Name = "Field1",
                IsRequired = true,
                Options = ["Option1", "Option2"]
            }
        };
        var form = new Form();
        form.Fields.AddRange(formFields);
        var subscriptionForm = new CommunitySubscriptionForm { Form = form };
        var community = new Community { Id = communityId, SubscriptionForm = subscriptionForm };
        var subscriptions = new List<Subscription>().AsQueryable();

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(new[] { community }.AsQueryable());
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        var handler = new SubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        await handler.Handle(command, CancellationToken.None);

        // Assert
        _dbContextMock.Verify(c => c.Subscriptions.AddAsync(It.IsAny<Subscription>(), It.IsAny<CancellationToken>()), Times.Once);
        _dbContextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
